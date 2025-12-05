const Groq = require("groq-sdk");

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { wishList, age, gender, maritalStatus } = req.body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const client = new Groq({ apiKey });

    const prompt = `
    You are an expert at Secret Santa gift recommendations.

    Suggest 5 creative and affordable gift ideas based on:

    Wishlist: ${wishList}
    Age: ${age}
    Gender: ${gender}
    Marital Status: ${maritalStatus}

    Rules:
    - Ideas must be suitable for office Secret Santa.
    - Keep it budget-friendly.
    - Return ONLY the list of ideas, one per line.
    `;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;

    const suggestions = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
}