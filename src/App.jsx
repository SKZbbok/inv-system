import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://query1.finance.yahoo.com/v7/finance/quote?symbols=KRW=X,^VIX,GOOGL"
        );
        const json = await res.json();
        const result = json.quoteResponse.result;

        const fx = result[0]?.regularMarketPrice || 0;
        const vix = result[1]?.regularMarketPrice || 0;
        const googl = result[2]?.regularMarketPrice || 0;

        const cnn =
          vix < 15 ? 80 :
          vix < 20 ? 60 :
          vix < 25 ? 40 :
          vix < 30 ? 25 : 10;

        setData({ fx, vix, cnn, googl });
      } catch (e) {
        console.error(e);
        setData({ fx: 0, vix: 0, cnn: 0, googl: 0 });
      }
    }

    fetchData();
  }, []);

  if (!data) return <div style={{ color: "white" }}>로딩중...</div>;

  const { fx, vix, cnn, googl } = data;

  function strength() {
    let base =
      cnn <= 25 ? 100 :
      cnn <= 45 ? 70 :
      cnn <= 55 ? 40 :
      cnn <= 75 ? 20 : 5;

    let vixMult =
      vix >= 35 ? 1.3 :
      vix >= 25 ? 1.15 :
      vix >= 20 ? 1.0 : 0.9;

    let fxMult =
      fx < 1400 ? 1.1 :
      fx < 1480 ? 1.0 :
      fx < 1550 ? 0.85 : 0.6;

    return Math.min(100, base * vixMult * fxMult);
  }

  return (
    <div style={{ background: "#07070e", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h2>📊 실전 자동 매수 시스템</h2>

      <p>💱 환율: {fx}</p>
      <p>📉 VIX: {vix}</p>
      <p>🧠 CNN Fear: {cnn}</p>
      <p>📈 GOOGL: {googl}</p>

      <hr />

      <h3>🔥 매수 판단</h3>
      <p style={{ fontSize: 24, color: "#f5c542" }}>
        매수 강도: {Math.round(strength())}%
      </p>
    </div>
  );
}
