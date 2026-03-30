export default async function handler(req, res) {
  try {
    const urls = [
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=KRW=X",
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOOGL"
    ];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const datas = await Promise.all(responses.map(r => r.json()));

    const fx = datas[0].quoteResponse.result[0].regularMarketPrice;
    const googl = datas[1].quoteResponse.result[0].regularMarketPrice;

    const vix = 20; // 임시값

    res.status(200).json({
      fx: Math.round(fx),
      vix
