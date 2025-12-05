import supabase from '../supabaseClient.js';
const Groq = require('groq-sdk');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { team_code } = req.body;

    if (!team_code || typeof team_code !== 'string' || team_code.trim() === '') {
      return res.status(400).json({ error: 'team_code is required' });
    }

    // Get team id
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('id')
      .eq('team_code', team_code)
      .single();

    console.log('Team lookup:', { team, teamError });

    if (teamError || !team) {
      return res.status(400).json({ error: 'Invalid team code' });
    }

    // Get participants
    const { data: participants, error: partError } = await supabase
      .from('participants')
      .select('name, age, gender, marital_status, wishlist')
      .eq('team_id', team.id);

    console.log('Participants query:', { participants: participants?.length, partError });

    if (partError) {
      console.error('Participants query error:', partError);
      return res.status(500).json({ error: 'Failed to fetch participants' });
    }

    if (!participants || participants.length === 0) {
      return res.status(400).json({ error: 'No participants found in this team' });
    }

    // Build prompt
    const participantsJson = JSON.stringify(participants, null, 2);

    const prompt = `
You are an expert Secret Santa gift recommender.

Generate 15 practical, thoughtful, creative, and affordable Secret Santa gift suggestions.

Budget rule:
- Gifts must be inexpensive (₹200 to ₹1200 max)
- No expensive or premium items
- Prefer personalized, fun, office-friendly, cozy, handmade-style gift ideas.

Participant details:
${participantsJson}

Instructions:
- Consider everyone's wishlist + personal traits.
- Suggest common gifts suitable for most people in the group.
- DO NOT personalize to a single person.
- Suggestions should be generic but smartly inspired by group preferences.
- Return the result as a simple numbered list (1, 2, 3, ...).
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

    // Parse suggestions
    const suggestions = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && /^\d+\./.test(line))
      .map((line) => line.replace(/^\d+\.\s*/, ''));

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}