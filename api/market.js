export default async function handler(req, res) {
  try {
    const getPrice = async (url) => {
      const r = await fetch(url);
      const j = await r.json();
      return j?.quoteResponse?.result?.[0]?.regularMarketPrice || null;
    };

    const fx = await getPrice("https://
