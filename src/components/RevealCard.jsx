import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const RevealCard = ({ receiver }) => {
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000); // Stop confetti after 5 seconds
    }, 1000); // Delay reveal for dramatic effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-green-500 p-4">
      {confetti && <Confetti />}
      <div className={`bg-white p-8 rounded-lg shadow-lg text-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl font-bold text-green-800 mb-4">🎄 Ho Ho Ho! 🎄</h1>
        <p className="text-lg mb-4">You have to gift to:</p>
        <h2 className="text-2xl font-semibold text-red-600 mb-4">{receiver.name}</h2>
        {receiver.age && (
          <div className="mb-2">
            <p className="text-lg">Age: {receiver.age}</p>
          </div>
        )}
        {receiver.gender && (
          <div className="mb-2">
            <p className="text-lg">Gender: {receiver.gender}</p>
          </div>
        )}
        {receiver.maritalStatus && (
          <div className="mb-2">
            <p className="text-lg">Marital Status: {receiver.maritalStatus}</p>
          </div>
        )}
        {receiver.wishList && (
          <div>
            <p className="text-lg mb-2">Wish List:</p>
            <p className="text-gray-700">{receiver.wishList}</p>
          </div>
        )}
        <div className="mt-6">
          <span className="text-4xl">🎁</span>
        </div>
      </div>
    </div>
  );
};

export default RevealCard;