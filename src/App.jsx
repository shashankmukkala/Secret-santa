import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Snowfall from './components/Snowfall';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import JoinTeam from './pages/JoinTeam';
import TeamDashboard from './pages/TeamDashboard';
import RevealPartner from './pages/RevealPartner';
import Reveal from './pages/Reveal';
import Suggestions from './pages/Suggestions';

function App() {
  return (
    <Router>
      <Snowfall />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Home />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/dashboard" element={<TeamDashboard />} />
        <Route path="/reveal-partner" element={<RevealPartner />} />
        <Route path="/reveal" element={<Reveal />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
    </Router>
  );
}

export default App;
