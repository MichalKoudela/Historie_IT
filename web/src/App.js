import React, { useState, useEffect } from 'react';
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
  const [articles, setArticles] = useState([]); // Stavy pro články
  const [currentPage, setCurrentPage] = useState(1); // Aktuální stránka
  const [selectedArticle, setSelectedArticle] = useState(null); // Vybraný článek pro modal
  const articlesPerPage = 6; // Počet článků na stránku

  useEffect(() => {
    // Načtení článků z JSON souboru
    fetch('/articles.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Soubor articles.json nebyl nalezen.');
        }
        return response.json();
      })
      .then((data) => setArticles(data))
      .catch((err) => console.error(err.message));
  }, []);

  // Výpočet indexů pro stránkování
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Funkce pro přechod na další a předchozí stránku
  const nextPage = () => {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="content article">
      <h1 className="title">Články</h1>
      <div className="grid">
        {currentArticles.map((article, index) => (
          <div
            key={index}
            className="card"
            onClick={() => setSelectedArticle(article)} // Nastavení vybraného článku
          >
            <h2>{article.title}</h2>
            <p><strong>Datum:</strong> {article.date}</p>
            <p>{article.text.slice(0, 100)}...</p> {/* Krátká ukázka textu */}
            {article.image && <img src={article.image} alt={article.title} />}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Předchozí
        </button>
        <span>Stránka {currentPage} z {Math.ceil(articles.length / articlesPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}>
          Další
        </button>
      </div>

      {/* Modal pro zobrazení vybraného článku */}
      {selectedArticle && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedArticle(null)}>×</button>
            <h2>{selectedArticle.title}</h2>
            <p><strong>Datum:</strong> {selectedArticle.date}</p>
            <p>{selectedArticle.text}</p>
            {selectedArticle.image && <img src={selectedArticle.image} alt={selectedArticle.title} />}
          </div>
        </div>
      )}
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
        <a href="/Historie IT.pdf" download="Historie_IT.pdf" className="download-button">
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
