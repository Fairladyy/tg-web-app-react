import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './Hooks/useTelegram';




function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <button onClick={onTogglebutton}>toggle</button>
    </div>
  );
}

export default App;
