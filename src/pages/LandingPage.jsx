import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-8">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Secret Santa for Teams — Powered by AI 🎄
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create teams, join the fun, reveal partners, and get AI-powered gift ideas.
          </p>
        </div>

        {/* Reminder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition ease-out duration-200 animate-fade-in">
            <div className="text-4xl mb-4">🎅</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Don't Forget Your Team Code!</h3>
            <p className="text-gray-600">It will be used in EVERY step. Lose it = Santa can't help you 😭</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition ease-out duration-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Only ONE Person Should Create the Team</h3>
            <p className="text-gray-600">If 10 people create 10 teams… Santa will resign 🎅💀</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition ease-out duration-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Share the Team Code With Everyone</h3>
            <p className="text-gray-600">Send it on WhatsApp, email, or shout across the office 😅</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition ease-out duration-200 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl mb-4">❄️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Everyone Must Join Before Pairing</h3>
            <p className="text-gray-600">More participants = more fun 🎉. Less participants = sad Santa 😢</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/app"
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-xl transition ease-out duration-200 hover:scale-105 shadow-lg"
        >
          🚀 Start the Game
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;