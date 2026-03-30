export default async function handler(req, res) {
  try {
    const urls = [
      "https://stooq.com/q/l/?s=usdkrw&f=sd2t2ohlcv&h&e=json",
      "https://stooq.com/q/l/?s=%5Evix&f=sd2t2ohlcv&h&e=json",
      "https://stooq.com/q/l/?s=googl.us&f=sd2t2ohlcv&h&e=json"
    ];

    const responses = await Promise.all(
      urls.map(url =>
        fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0" }
        })
      )
    );

    const datas = await Promise.all(responses.map(r => r.json()));

    // 🔥 안전 파싱
    const fx = parseFloat(datas[0]?.data?.[0]?.c) || 0;
    const vix = parseFloat(datas[1]?.data?.[0]?.c) || 0;
    const googl = parseFloat(datas[2]?.data?.[0]?.c) || 0;

    const cnn =
      vix < 15 ? 80 :
      vix < 20 ? 60 :
      vix < 25 ? 40 :
      vix < 30 ? 25 : 10;

    res.status(200).json({ fx, vix, cnn, googl });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "fail" });
  }
}
