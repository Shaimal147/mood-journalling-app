import { useEffect, useState } from 'react';

function App() {
  const [apiMessage, setApiMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:3001/')
    .then(res => res.text())
    .then(setApiMessage)
    .catch(console.error);
  }, []);


  return (
    <>
      <h1>{apiMessage}</h1>
    </>
  )
}

export default App
