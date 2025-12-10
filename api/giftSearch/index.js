const Groq = require('groq-sdk');

function sanitizeAI(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/[\u0000-\u001F]+/g, "")  // remove control chars
    .trim();
}

function buildAmazonLink(keyword) {
  const encoded = encodeURIComponent(keyword);
  return `https://www.amazon.in/s?k=${encoded}&tag=secretsantaai-21`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({ error: 'query is required' });
    }

    const prompt = `
Generate 15–20 gift ideas based on this search query: "${query}"

They must be practical, creative, and meaningful.

For every gift item, include:
- name: string
- description: string
- price_range: string (e.g., "₹200-₹500")
- amazon_search_keyword: string

Do NOT include URLs. Only return plain JSON.

Return a JSON array of objects with these exact fields.

Respond with ONLY valid JSON. No backticks, no markdown, no explanation.
`;

    // Call Groq
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    const client = new Groq({ apiKey });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;

    const cleaned = sanitizeAI(text);
    let suggestions;

    try {
      suggestions = JSON.parse(cleaned);
      // Add affiliate URLs
      suggestions = suggestions.map(item => ({
        ...item,
        amazon_affiliate_url: buildAmazonLink(item.amazon_search_keyword)
      }));
    } catch (parseError) {
      console.log("Parse fail. Cleaned text:", cleaned);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}