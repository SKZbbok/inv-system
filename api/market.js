export default async function handler(req, res) {
  try {
    // 🔥 Yahoo Finance (비공식 JSON)
    const urls = [
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=KRW=X", // 환율
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^VIX",  // VIX
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOOGL"  // 구글
    ];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const datas = await Promise.all(responses.map(r => r.json()));

    const fx = datas[0].quoteResponse.result[0].regularMarketPrice;
    const vix = datas[1].quoteResponse.result[0].regularMarketPrice;
    const googl = datas[2].quoteResponse.result[0].regularMarketPrice;

    // 🔥 CNN Fear 대체 로직 (VIX 기반)
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
