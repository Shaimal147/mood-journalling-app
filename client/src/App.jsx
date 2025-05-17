import { useEffect, useState } from 'react';

function App() {
  const [apiMessage, setApiMessage] = useState('');
  const [entries, setEntries] = useState([]);
  const [emoji, setEmoji] = useState('');
  const [answers, setAnswers] = useState(Array(5).fill(''));

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.text())
      .then(setApiMessage)
      .catch(console.error);

    fetchEntries();
  }, []);

  function fetchEntries() {
    fetch('http://localhost:3001/entries')
      .then(res => res.json())
      .then(setEntries)
      .catch(console.error);
  }

  function handleAnswerChange(index, value) {
    setAnswers(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { id: Date.now().toString(), emoji, answers };
    await fetch('http://localhost:3001/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setEmoji('');
    setAnswers(Array(5).fill(''));
    fetchEntries();
  }

  return (
    <div>
      <h1>{apiMessage}</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={emoji}
          onChange={e => setEmoji(e.target.value)}
          placeholder="Emoji"
        />
        {answers.map((ans, i) => (
          <input
            key={i}
            value={ans}
            onChange={e => handleAnswerChange(i, e.target.value)}
            placeholder={`Answer ${i + 1}`}
          />
        ))}
        <button type="submit">Add Entry</button>
      </form>
      <h2>Entries</h2>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            {entry.emoji} - {entry.answers.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
