import React from 'react';
import './App.css';
import Header from './components/Header/Header';

import '@solana/wallet-adapter-react-ui/styles.css'

function App() {
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
