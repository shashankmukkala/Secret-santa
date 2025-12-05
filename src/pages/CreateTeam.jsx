import { useState } from 'react';

const CreateTeam = () => {
  const [hostEmail, setHostEmail] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateTeam = async () => {
    if (!hostEmail.trim()) {
      setError('Please enter a host email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/createTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ host_email: hostEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setTeamCode(data.team_code);
      } else {
        setError(data.error || 'Failed to create team');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Team</h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Host Email"
              value={hostEmail}
              onChange={(e) => setHostEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={handleCreateTeam}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Creating...' : '🎁 Create Team'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {teamCode && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <p className="text-lg text-gray-700">Team Code:</p>
                <p className="text-3xl font-bold text-green-600">{teamCode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;