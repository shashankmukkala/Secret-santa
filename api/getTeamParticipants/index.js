import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' });
  }

  try {
    const { team_code } = req.query;

    if (!team_code) {
      return res.status(400).json({ error: 'team_code is required' });
    }

    // Get team id
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('id')
      .eq('team_code', team_code)
      .single();

    if (teamError || !team) {
      return res.status(400).json({ error: 'Invalid team code' });
    }

    // Get participants
    const { data: participants, error: partError } = await supabase
      .from('participants')
      .select('*')
      .eq('team_id', team.id);

    if (partError) {
      console.error('Participants query error:', partError);
      return res.status(500).json({ error: 'Failed to fetch participants' });
    }

    res.status(200).json({ participants: participants || [] });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}