export default async function handler(req, res) {
  try {
    const getPrice = async (url) => {
      const r = await fetch(url);
      const j = await r.json();
      return j?.quoteResponse?.result?.[0]?.regularMarketPrice || null;
    };

    const fx = await getPrice("https://query1.finance.yahoo.com/v7/finance/quote?symbols=KRW=X");
    const googl = await getPrice("https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOOGL");

    res.status(200).json({
      fx: fx ? Math.round(fx) : 0,
      vix: 20,
      cnn: 40,
      googl: googl ? Math.round(googl) : 0
    });

  } catch (error) {
    res.status(200).json({
      fx: 0,
      vix: 20,
      cnn: 40,
      googl: 0,
      error: "fallback"
    });
  }
}
