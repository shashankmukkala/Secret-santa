import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  console.log('Request body:', req.body);
  console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
  console.log('SUPABASE_SERVICE_ROLE exists:', !!process.env.SUPABASE_SERVICE_ROLE);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only allowed' });
  }

  try {
    const { host_email } = req.body;

    if (!host_email || typeof host_email !== 'string') {
      return res.status(400).json({ error: 'host_email is required' });
    }

    // Generate 6-digit team code
    const team_code = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log('Generated team_code:', team_code);

    const { data, error } = await supabase
      .from('teams')
      .insert([{ team_code, host_email }]);

    console.log('Supabase insert result:', { data, error });

    if (error) {
      console.error('Supabase Insert Error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ team_code });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
}