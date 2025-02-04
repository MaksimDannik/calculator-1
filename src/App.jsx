import { useState } from 'react';
import './App.css';

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const[result, setResult] = useState('');
  const [operator, setOperator] = useState('+');

  const onAChange = (e) => setA(+e.target.value || 0);
  const onBChange = (e) => setB(+e.target.value || 0);
  const onOperatorChange = (op) => {
    setOperator(op);
  }

  const send = (a, b, operator) => {
    return fetch(`http://localhost:3001/calc/${operator}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ a, b })
    })
}

const final = () => {
    send(a, b, operator).then(res => res.json()).then(res => {
        setResult(res.result)
    })
};

  return (
    <div className="App">
      <div>
        <div className="values">
          <input type='number' onChange={onAChange} />
          <input type='number' onChange={onBChange} />
        </div>
        <div>
          <Operator selected={operator} onClick={onOperatorChange} operator='plus' />
          <Operator selected={operator} onClick={onOperatorChange} operator='minus' />
          <Operator selected={operator} onClick={onOperatorChange} operator='multi' />
          <Operator selected={operator} onClick={onOperatorChange} operator='divide' />
          <Operator onClick={final} operator='Sum'/>
        </div>
      </div>
      <p>Result: {result}</p>
      <hr />
    </div>
    
  );
}

const Operator = ({ operator, onClick, selected }) => {
  return (
    <button className='operator-btn' disabled={selected === operator} onClick={() => onClick(operator)}>{operator}</button>
  )
}
