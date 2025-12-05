import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  console.log('runPairing request body:', req.body);

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

    console.log('Team lookup result:', { team, teamError });

    if (teamError || !team) {
      return res.status(400).json({ error: 'Invalid team code' });
    }

    // Get participants
    const { data: participants, error: partError } = await supabase
      .from('participants')
      .select('*')
      .eq('team_id', team.id);

    console.log('Participants query result:', { participants: participants?.length, partError });

    if (partError) {
      console.error('Participants query error:', partError);
      return res.status(500).json({ error: 'Failed to fetch participants' });
    }

    if (!participants || participants.length < 2) {
      return res.status(400).json({ error: 'Need at least 2 participants to run pairing' });
    }

    // Shuffle participants
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    // Create pairings
    const pairings = [];
    for (let i = 0; i < shuffled.length; i++) {
      const giver = shuffled[i];
      const receiver = shuffled[(i + 1) % shuffled.length];
      pairings.push({
        team_id: team.id,
        giver_id: giver.id,
        receiver_id: receiver.id
      });
    }

    console.log('Generated pairings:', pairings.length);

    // Insert pairings
    const { data: insertData, error: insertError } = await supabase
      .from('pairings')
      .insert(pairings);

    console.log('Pairings insert result:', { insertData, insertError });

    if (insertError) {
      console.error('Insert pairings error:', insertError);
      return res.status(500).json({ error: insertError.message });
    }

    res.status(200).json({ success: true, message: 'Pairing completed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}