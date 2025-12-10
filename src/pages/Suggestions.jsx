import { useState } from 'react';
import { Link } from 'react-router-dom';

const Suggestions = () => {
  const [teamForm, setTeamForm] = useState({ team_code: '', email: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    if (!teamForm.team_code.trim() || !teamForm.email.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');
    setSuggestions([]);

    try {
      const response = await fetch('/api/giftSuggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamForm),
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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setMessage('Please enter a search query');
      return;
    }

    setLoading(true);
    setMessage('');
    setSuggestions([]);

    try {
      const response = await fetch('/api/giftSearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions);
      } else {
        setMessage(data.error || 'Failed to search gifts');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setMessage('');
    setSuggestions([]);

    try {
      const response = await fetch('/api/giftSearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions);
      } else {
        setMessage(data.error || 'Failed to search gifts');
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
        <h1 className="text-3xl font-bold">🎄 AI Gift Finder 🎄</h1>
      </div>
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <div className="mb-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">&larr; Back to Home</Link>
        </div>

        <div className="space-y-8">
          {/* Team-Based Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎁 Personalized Gift Suggestions</h2>
            <p className="text-gray-600 mb-4">Get AI-powered gift ideas tailored to a specific team member.</p>
            <form onSubmit={handleTeamSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Team Code"
                value={teamForm.team_code}
                onChange={(e) => setTeamForm({ ...teamForm, team_code: e.target.value })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="email"
                placeholder="Participant Email"
                value={teamForm.email}
                onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
              >
                {loading ? 'Generating...' : 'Get Suggestions'}
              </button>
            </form>
          </div>

          {/* Search Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 AI Gift Search</h2>
            <p className="text-gray-600 mb-4">Search for gift ideas using any description or theme.</p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="e.g., gifts for coffee lovers, tech gadgets under 500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
              >
                {loading ? 'Searching...' : 'Search Gifts'}
              </button>
            </form>
          </div>

          {/* Results */}
          {message && <p className={`text-center text-sm ${message.includes('error') || message.includes('Failed') ? 'text-red-500' : 'text-gray-700'}`}>{message}</p>}

          {suggestions.length > 0 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gift Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{suggestion.name}</h4>
                    <p className="text-gray-600 mb-3">{suggestion.description}</p>
                    <p className="text-sm text-green-600 font-semibold mb-4">{suggestion.price_range}</p>
                    <a
                      href={suggestion.amazon_affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#ffbd00] hover:bg-[#ffb300] text-black px-4 py-3 rounded-lg font-semibold text-center transition ease-out duration-200 hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                      🛍️ Buy on Amazon
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎄 Featured Christmas Gift Ideas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Top Gifts Under ₹500', icon: '🎁', query: 'best gifts under 500' },
                { title: 'Tech Gifts Under ₹1000', icon: '📱', query: 'tech gadgets under 1000' },
                { title: 'Cute Gifts for Women', icon: '💄', query: 'cute gifts for women' },
                { title: 'Funny Secret Santa Gifts', icon: '😂', query: 'funny secret santa gifts' },
                { title: 'Cozy Winter Essentials', icon: '🧣', query: 'cozy winter gifts' },
                { title: 'Handmade & Personalized', icon: '✨', query: 'handmade personalized gifts' }
              ].map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleQuickSearch(category.query)}
                  className="bg-gradient-to-r from-red-100 to-green-100 p-4 rounded-lg text-center hover:scale-105 active:scale-95 transition ease-out duration-200 cursor-pointer shadow-md"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-semibold text-gray-800">{category.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Suggestions;