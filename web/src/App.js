import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState(0);

  const renderContent = () => {
    switch (selectedOption) {
      case 0:
        return <Home />;
      case 1:
        return <Article />;
      case 2:
        return <Book />;
      case 3:
        return <Quizes />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Menu setSelectedOption={setSelectedOption} />
      {renderContent()}
    </div>
  );
}

function Menu({ setSelectedOption }) {
  return (
      <ul className="menu">
        <li onClick={() => setSelectedOption(0)}><h2>Domov</h2></li>
        <li onClick={() => setSelectedOption(1)}><h2>Články</h2></li>
        <li onClick={() => setSelectedOption(2)}><h2>Kniha</h2></li>
        <li onClick={() => setSelectedOption(3)}><h2>Kvízy</h2></li>
      </ul>
  );
}

function Article() {
  return (
    <div className="content article">
      <h1 className="title">Články</h1>
      <div className="grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card">
            <h2>#{index + 1}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Read more</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="content home">
      <h1 className="title">Články</h1>
      <div className="columns">
        <div className="column">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nisi quam...</p>
        </div>
        <div className="column">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nisi quam...</p>
        </div>
      </div>
    </div>
  );
}

function Book() {
  return (
    <div className="content book">
      <h1 className="title">Kniha</h1>
      <div className="download-section">
        <p>Stáhněte si knihu kliknutím na tlačítko níže:</p>
        <a href="./Historie IT.pdf" download="Historie_IT.pdf" className="download-button">
          Stáhnout PDF
        </a>
      </div>
    </div>
  );
}

function Quizes() {
  return (
    <div className="content quizes">
      <h1 className="title">Kvízy</h1>
      <div className="quiz">
        <h2>Lorem ipsum dolor sit amet?</h2>
        <ul>
          <li>A: Lorem ipsum dolor sit amet</li>
          <li>B: Lorem ipsum dolor sit amet</li>
          <li>C: Lorem ipsum dolor sit amet</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
