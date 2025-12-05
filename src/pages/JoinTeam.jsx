import { useState } from 'react';

const JoinTeam = () => {
  const [formData, setFormData] = useState({
    team_code: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    marital_status: '',
    wishlist: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value.trim())) {
      setMessage('All fields are required');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/addParticipant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          team_code: '',
          name: '',
          email: '',
          age: '',
          gender: '',
          marital_status: '',
          wishlist: ''
        });
      } else {
        setMessage(data.error || 'Failed to add participant');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Join Team</h2>
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
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="wishlist"
              placeholder="Wishlist"
              value={formData.wishlist}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Adding...' : '👥 Join Team'}
            </button>
          </form>
          {message && <p className={`mt-4 text-sm ${message.includes('added') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;