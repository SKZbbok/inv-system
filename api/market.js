export default async function handler(req, res) {
  try {
    // 환율
    const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const fxData = await fxRes.json();

    // Yahoo Finance (VIX + GOOGL)
    const marketRes = await fetch(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=%5EVIX,GOOGL"
    );
    const marketData = await marketRes.json();

    const result = marketData.quoteResponse.result;

    const vix = result.find(x => x.symbol === "^VIX")?.regularMarketPrice;
    const googl = result.find(x => x.symbol === "GOOGL")?.regularMarketPrice;

    // CNN Fear (임시 대체: 시장 심리 근사)
    const cnnFear = Math.min(100, Math.max(0, 100 - vix * 2));

    res.status(200).json({
      fx: fxData.rates.KRW,
      vix,
      googl,
      cnn: Math.round(cnnFear)
    });

  } catch (e) {
    res.status(500).json({ error: "data fetch failed" });
  }
}
