import { useEffect, useState } from 'react';

const Snowfall = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const generateFlakes = () => {
      const newFlakes = [];
      for (let i = 0; i < 50; i++) {
        newFlakes.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 10 + 10,
          animationDelay: Math.random() * 10,
          size: Math.random() * 4 + 2,
        });
      }
      setFlakes(newFlakes);
    };

    generateFlakes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white opacity-30 animate-fall"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.size}px`,
          }}
        >
          ❄️
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Snowfall;