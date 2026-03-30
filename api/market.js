export default async function handler(req, res) {
  try {
    const fxRes = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
    const fxData = await fxRes.json();

    const vixRes = await fetch("https://query1.finance.yahoo.com/v7/finance/quote?symbols=^VIX");
    const vixData = await vixRes.json();

    const cnnRes = await fetch("https://production.dataviz.cnn.io/index/fearandgreed/graphdata");
    const cnnData = await cnnRes.json();

    const googlRes = await fetch("https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOOGL");
    const googlData = await googlRes.json();

    res.status(200).json({
      fx: fxData.rates.KRW,
      vix: vixData.quoteResponse.result[0].regularMarketPrice,
      cnn: cnnData.fear_and_greed.score,
      googl: googlData.quoteResponse.result[0].regularMarketPrice
    });

  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
}
