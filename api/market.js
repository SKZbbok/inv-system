export default async function handler(req, res) {
  try {
    // 🔥 테스트용 고정 데이터 (API 없이 작동 확인)
    const data = {
      fx: 1450,
      vix: 22,
      cnn: 40,
      googl: 150
    };

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "API error" });
  }
}
