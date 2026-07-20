import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/activities`
          : 'http://localhost:8000/api/activities';
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity.id || activity._id || activity.type}>
            <strong>{activity.type || 'Activity'}</strong>
            {activity.duration ? ` — ${activity.duration} min` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
