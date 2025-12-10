import { useState } from 'react';

const TeamDashboard = () => {
  const [teamCode, setTeamCode] = useState('');
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  const handleLoadTeam = async () => {
    if (!teamCode.trim()) {
      setMessage('Please enter a team code');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/getTeamParticipants?team_code=${encodeURIComponent(teamCode)}`);

      const data = await response.json();

      if (response.ok) {
        setParticipants(data.participants);
        setLoaded(true);
      } else {
        setMessage(data.error || 'Failed to load team');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleRunPairing = async () => {
    setRunLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/runPairing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_code: teamCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Failed to run pairing');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setRunLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Dashboard</h2>

          {!loaded ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Team Code"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                onClick={handleLoadTeam}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
              >
                {loading ? 'Loading...' : '📊 Load Team'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {participants.length} participants joined
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {participants.map((participant) => (
                    <div key={participant.id} className="bg-gray-50 p-3 rounded-lg text-left">
                      <p className="font-medium">{participant.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {participants.length < 2 ? (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-lg cursor-not-allowed shadow-md"
                  >
                    Need at least 2 participants
                  </button>
                ) : (
                  <button
                    onClick={handleRunPairing}
                    disabled={runLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
                  >
                    {runLoading ? 'Running...' : '🎉 Run Pairing'}
                  </button>
                )}
              </div>
            </div>
          )}

          {message && <p className={`mt-4 text-sm ${message.includes('completed') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;