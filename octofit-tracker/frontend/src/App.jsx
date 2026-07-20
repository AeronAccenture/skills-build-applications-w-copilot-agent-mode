import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="display-6 fw-bold text-primary">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness and team tracking experience.
              </p>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">User profiles and authentication</li>
                <li className="list-group-item">Activity logging and progress tracking</li>
                <li className="list-group-item">Team management and challenge leaderboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
