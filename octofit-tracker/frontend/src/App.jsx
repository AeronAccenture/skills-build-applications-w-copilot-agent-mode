import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="display-6 fw-bold text-primary">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness and team tracking experience.
              </p>
              <div className="alert alert-info small" role="alert">
                Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs, or the app will fall back to <code>http://localhost:8000</code>.
              </div>
              <nav className="nav nav-pills flex-wrap mb-4">
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </nav>
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
