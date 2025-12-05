import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50">
      <div className="bg-gradient-to-r from-red-400 to-green-400 text-white py-6 text-center rounded-b-xl shadow-lg">
        <h1 className="text-3xl font-bold">🎄 Secret Santa 🎄</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Secret Santa!</h2>
          <p className="text-gray-600 mb-8">Organize your gift exchange with ease.</p>
          <div className="space-y-4">
            <Link
              to="/create-team"
              className="block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 shadow-md"
            >
              🎁 Create Team
            </Link>
            <Link
              to="/join-team"
              className="block bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 shadow-md"
            >
              👥 Join Team
            </Link>
            <Link
              to="/dashboard"
              className="block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 shadow-md"
            >
              📊 Team Dashboard
            </Link>
            <Link
              to="/reveal-partner"
              className="block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 shadow-md"
            >
              🎉 Reveal Your Gift Partner
            </Link>
            <Link
              to="/suggestions"
              className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition ease-out duration-200 hover:scale-105 shadow-md"
            >
              🤖 AI Gift Suggestions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;