export default async function handler(req, res) {
  try {
    const urls = [
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=KRW=X",
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^VIX",
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOOGL"
    ];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const datas = await Promise.all(responses.map(r => r.json()));

    // 안전하게 값 꺼내기
    const fx = datas[0]?.quoteResponse?.result?.[0]?.regularMarketPrice ?? 0;
    const vix = datas[1]?.quoteResponse?.result?.[0]?.regularMarketPrice ?? 0;
    const googl = datas[2]?.quoteResponse?.result?.[0]?.regularMarketPrice ?? 0;

    // CNN Fear 계산
    let cnn =
      vix < 15 ? 80 :
      vix < 20 ? 60 :
      vix < 25 ? 40 :
      vix < 30 ? 25 : 10;

    res.status(200).json({
      fx,
      vix,
      cnn,
      googl
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API error" });
  }
}
