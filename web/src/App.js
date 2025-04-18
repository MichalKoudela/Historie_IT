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
  const articlesPerPage = 8; // Počet článků na stránku

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
  const [articles, setArticles] = useState([]); // Stavy pro články
  const [selectedArticle, setSelectedArticle] = useState(null); // Vybraný článek pro modal

  useEffect(() => {
    // Načtení článků z JSON souboru
    fetch('/articles.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Soubor articles.json nebyl nalezen.');
        }
        return response.json();
      })
      .then((data) => {
        // Seřazení článků podle data (nejnovější první)
        const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedArticles.slice(0, 2)); // Zobrazení pouze dvou nejnovějších článků
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="content home">
      <h1 className="title">Nejnovější články</h1>
      <div className="special">
        {articles.map((article, index) => (
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
  const [questions, setQuestions] = useState([]); // Načtené otázky
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index aktuální otázky
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Vybraná odpověď
  const [isCorrect, setIsCorrect] = useState(null); // Stav správnosti odpovědi

  useEffect(() => {
    // Načtení otázek z JSON souboru
    fetch('/questions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Soubor questions.json nebyl nalezen.');
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err.message));
  }, []);

  const handleAnswerClick = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct) {
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Přechod na další otázku
      }, 1000); // Po 1 sekundě přejde na další otázku
    } else {
      setIsCorrect(false);
    }
  };

  if (questions.length === 0) {
    return <div className="content quizes">Načítám otázky...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return <div className="content quizes">Kvíz dokončen! Gratulujeme!</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="content quizes">
      <h1 className="title">Kvízy</h1>
      <div className="quiz">
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.answers.map((answer, index) => (
            <li
              key={index}
              className={`answer ${selectedAnswer === answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
