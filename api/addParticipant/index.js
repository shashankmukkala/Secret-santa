import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  console.log('addParticipant request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { team_code, name, email, age, gender, marital_status, wishlist } = req.body;

    if (!team_code || !name || !email || !age || !gender || !marital_status || !wishlist) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Lookup team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('id')
      .eq('team_code', team_code)
      .single();

    console.log('Team lookup result:', { team, teamError });

    if (teamError || !team) {
      return res.status(400).json({ error: 'Invalid team code' });
    }

    // Insert participant
    const { data: insertData, error: insertError } = await supabase
      .from('participants')
      .insert([{
        team_id: team.id,
        name,
        email,
        age,
        gender,
        marital_status,
        wishlist
      }]);

    console.log('Participant insert result:', { insertData, insertError });

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(500).json({ error: insertError.message });
    }

    res.status(200).json({ success: true, message: 'Participant added!' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}