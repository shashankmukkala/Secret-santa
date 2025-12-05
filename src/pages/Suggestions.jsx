import { useState } from 'react';
import { Link } from 'react-router-dom';

const Suggestions = () => {
  const [teamCode, setTeamCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamCode.trim()) {
      setMessage('Please enter a team code');
      return;
    }

    setLoading(true);
    setMessage('');
    setSuggestions([]);

    try {
      const response = await fetch('/api/giftSuggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_code: teamCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions);
      } else {
        setMessage(data.error || 'Failed to get suggestions');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="max-w-4xl mx-auto p-4 mt-8">
        <div className="mb-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">&larr; Back to Home</Link>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎁 AI Gift Suggestions 🎁</h2>

          <form onSubmit={handleSubmit} className="mb-6">
            <label className="block text-gray-700 mb-2">Team Code:</label>
            <input
              type="text"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
              placeholder="Enter your team code"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Generating...' : '🤖 Get AI Suggestions'}
            </button>
          </form>

          {message && <p className={`mb-4 text-sm ${message.includes('error') || message.includes('Failed') ? 'text-red-500' : 'text-gray-700'}`}>{message}</p>}

          {suggestions.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Gift Suggestions for Your Team:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-green-100 p-4 rounded-xl shadow-md">
                    <p className="text-gray-800">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;