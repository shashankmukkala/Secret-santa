import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { team_code, email } = req.body;

    if (!team_code || !email) {
      return res.status(400).json({ error: 'team_code and email are required' });
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

    // Get participant
    const { data: participant, error: partError } = await supabase
      .from('participants')
      .select('*')
      .eq('email', email)
      .eq('team_id', team.id)
      .single();

    console.log('Participant lookup:', { participant, partError });

    if (partError || !participant) {
      return res.status(400).json({ error: 'Participant not found in this team' });
    }

    // Get pairing
    const { data: pairing, error: pairError } = await supabase
      .from('pairings')
      .select('receiver_id')
      .eq('giver_id', participant.id)
      .single();

    console.log('Pairing lookup:', { pairing, pairError });

    if (pairError || !pairing) {
      return res.status(400).json({ error: 'Pairing not found. The host may not have run pairing yet.' });
    }

    // Get receiver
    const { data: receiver, error: recError } = await supabase
      .from('participants')
      .select('*')
      .eq('id', pairing.receiver_id)
      .single();

    console.log('Receiver lookup:', { receiver, recError });

    if (recError || !receiver) {
      return res.status(500).json({ error: 'Receiver not found' });
    }

    res.status(200).json({
      receiver: {
        name: receiver.name,
        email: receiver.email,
        age: receiver.age,
        gender: receiver.gender,
        marital_status: receiver.marital_status,
        wishlist: receiver.wishlist
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}