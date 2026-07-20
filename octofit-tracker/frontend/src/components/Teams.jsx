import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams`);
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team.id || team._id || team.name}>
            <strong>{team.name || 'Untitled team'}</strong>
            {team.sport ? ` — ${team.sport}` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
