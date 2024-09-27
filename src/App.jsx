import { useState } from 'react';
import CardContainer from './components/CardContainer';
import './styles/App.css';

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [record, setRecord] = useState(0);

  return (
    <div className='App'>
      <div className='scoreBoard'>
        <div className='score' >Current score: {clickedIds.length}</div>
        <div className='record'>Record: {record}</div>
      </div>

      <CardContainer clickedIds={clickedIds} setClickedIds={setClickedIds} record={record} setRecord={setRecord} />

      <p className='caption'>Don't click the same pokèmon twice!</p>

    </div>
  );
}

export default App;
