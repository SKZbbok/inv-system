import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 🔥 테스트 데이터 (API 없이 바로 실행)
    setData({
      fx: 1450,
      vix: 22,
      cnn: 40,
      googl: 150
    });
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
