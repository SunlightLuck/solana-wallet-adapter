import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

import '@solana/wallet-adapter-react-ui/styles.css'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
    </div>
  );
}

export default App;
