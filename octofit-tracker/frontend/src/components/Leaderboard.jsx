import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
          : 'http://localhost:8000/api/leaderboard';
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry, index) => (
          <li className="list-group-item" key={entry.id || entry._id || `${entry.name}-${index}`}>
            <strong>{entry.name || entry.username || 'Player'}</strong>
            {entry.score ? ` — ${entry.score}` : ''}
          </li>
        ))}
      </ol>
    </section>
  );
}
