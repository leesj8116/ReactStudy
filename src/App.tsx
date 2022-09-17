import React from 'react';
import './App.css';
import TodoBox from './components/TodoBox/TodoBox';

const App = () => {
  return (
    <div className="App">
      <h1 className="title">todos</h1>
      <TodoBox />
    </div>
  );
}

export default App;
