import { useState } from 'react';

const EMOJIS = ['😄','🙂','😐','😔','😢'];

export default function MoodForm({ onSaved }) {
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [answers, setAnswers] = useState(Array(5).fill(''));

  const handleChangeAnswer = (idx, val) =>
    setAnswers(a => a.map((x,i)=> i===idx ? val : x));

  const handleSubmit = async e => {
    e.preventDefault();
    const id = new Date().toISOString().slice(0,10); // YYYY-MM-DD

    await fetch('http://localhost:3001/entries', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ id, emoji, answers })
    });

    onSaved();                 // parent will re-load
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        {EMOJIS.map(e => (
          <button
            type="button"
            key={e}
            className={e === emoji ? 'selected' : ''}
            onClick={() => setEmoji(e)}>
            {e}
          </button>
        ))}
      </section>

      {answers.map((ans, i) => (
        <div key={i}>
          <label>Q{i+1}</label>
          <input
            value={ans}
            onChange={ev => handleChangeAnswer(i, ev.target.value)}
            required
          />
        </div>
      ))}

      <button type="submit">Save mood</button>
    </form>
  );
}
