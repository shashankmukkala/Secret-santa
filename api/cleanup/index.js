import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  console.log('Cleanup API called');

  try {
    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Delete old pairings
    const { error: pairingsError } = await supabase
      .from('pairings')
      .delete()
      .lt('created_at', thirtyDaysAgo);

    if (pairingsError) {
      console.error('Error deleting old pairings:', pairingsError);
    }

    // Delete old participants
    const { error: participantsError } = await supabase
      .from('participants')
      .delete()
      .lt('created_at', thirtyDaysAgo);

    if (participantsError) {
      console.error('Error deleting old participants:', participantsError);
    }

    // Delete old teams
    const { error: teamsError } = await supabase
      .from('teams')
      .delete()
      .lt('created_at', thirtyDaysAgo);

    if (teamsError) {
      console.error('Error deleting old teams:', teamsError);
    }

    res.status(200).json({ success: true, message: "Cleanup completed" });
  } catch (error) {
    console.error('Cleanup API Error:', error);
    res.status(500).json({ success: true, message: "Cleanup completed" });
  }
}