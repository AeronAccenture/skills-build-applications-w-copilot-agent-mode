import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
          : 'http://localhost:8000/api/workouts';
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout.id || workout._id || workout.name}>
            <strong>{workout.name || 'Workout'}</strong>
            {workout.focus ? ` — ${workout.focus}` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
