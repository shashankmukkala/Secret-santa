import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' });
  }

  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Debug teams error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ teams: data });
  } catch (err) {
    console.error('Debug API Error:', err);
    return res.status(500).json({ error: err.message });
  }
}