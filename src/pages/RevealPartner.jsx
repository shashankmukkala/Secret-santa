import { useState } from 'react';

const RevealPartner = () => {
  const [formData, setFormData] = useState({
    team_code: '',
    email: ''
  });
  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.team_code.trim() || !formData.email.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');
    setReceiver(null);

    try {
      const response = await fetch('/api/revealPartner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setReceiver(data.receiver);
      } else {
        setMessage(data.error || 'Failed to reveal partner');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reveal Your Secret Santa Partner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="team_code"
              placeholder="Team Code"
              value={formData.team_code}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Revealing...' : '🎉 Reveal My Partner'}
            </button>
          </form>
          {message && <p className={`mt-4 text-sm ${message.includes('error') || message.includes('not found') ? 'text-red-500' : 'text-gray-700'}`}>{message}</p>}
          {receiver && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Your Secret Santa Recipient:</h3>
              <div className="text-left space-y-2">
                <p><strong>Name:</strong> {receiver.name}</p>
                <p><strong>Wishlist:</strong> {receiver.wishlist}</p>
                <p><strong>Age:</strong> {receiver.age}</p>
                <p><strong>Gender:</strong> {receiver.gender}</p>
                <p><strong>Marital Status:</strong> {receiver.marital_status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevealPartner;