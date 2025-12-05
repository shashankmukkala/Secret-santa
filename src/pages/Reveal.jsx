import { useState } from 'react';
import { Link } from 'react-router-dom';
import RevealCard from '../components/RevealCard';

const Reveal = () => {
  const [input, setInput] = useState('');
  const [receiver, setReceiver] = useState(null);
  const [error, setError] = useState('');

  const handleReveal = () => {
    const pairings = localStorage.getItem('pairings');
    const participants = localStorage.getItem('participants');

    if (!pairings || !participants) {
      setError('Pairings not generated yet.');
      return;
    }

    const pairingsObj = JSON.parse(pairings);
    const participantsArr = JSON.parse(participants);

    // Find participant by name or email
    const participant = participantsArr.find(p => p.name.toLowerCase() === input.toLowerCase() || p.email.toLowerCase() === input.toLowerCase());

    if (!participant) {
      setError('Participant not found.');
      return;
    }

    const rec = pairingsObj[participant.name];
    if (!rec) {
      setError('No pairing found for this participant. Pairings may be outdated. Please regenerate pairings.');
      return;
    }

    // Use current participant data for the receiver to ensure latest details
    const currentReceiver = participantsArr.find(p => p.name === rec.name);
    setReceiver(currentReceiver || rec);
    setError('');
  };

  if (receiver) {
    return <RevealCard receiver={receiver} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 to-green-500 p-4 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6">🎁 Reveal Your Gift Partner 🎁</h1>
        <p className="text-lg text-gray-700 mb-6">Enter your name or email to see who you have to gift:</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          placeholder="Name or Email"
        />
        <button
          onClick={handleReveal}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold text-lg mb-4"
        >
          Reveal
        </button>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Reveal;