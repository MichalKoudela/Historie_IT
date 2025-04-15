import './App.css';

function App() {
  let selectedOption = 0;
  return (
    <div className="App">
      <div>
        if (selectedOption === 0) {
          <Home />
        } else if (selectedOption === 1) {
          <Article />
        } else if (selectedOption === 2) {
          <Book />
        } else if (selectedOption === 3) {
          <Quizes /> 
        }
      </div>
    </div>
  );
}
function Menu(){
  return (
    <nav>
      <ul className="menu">
        <li><h2 onClick>Domov</h2></li>
        <li><h2>Články</h2></li>
        <li><h2>Kniha</h2></li>
        <li><h2>Kvízy</h2></li>
      </ul>
    </nav>
  );
}
function Article(){
<>
      <div className="menu">
        <Menu />
      </div>
      <div className="content">
        <h1 className="title">Historie IT</h1>
        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nunc nec justo facilisis aliquet. Donec non odio at ligula venenatis efficitur. Sed euismod, nisi vel consectetur interdum, nisl nisi cursus enim, ac lacinia erat erat a augue.</p>
      </div>
   </>
}
function Book(){
<>
      <div className="menu">
        <Menu />
      </div>
      <div className="content">
        <h1 className="title">Historie IT</h1>
        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nunc nec justo facilisis aliquet. Donec non odio at ligula venenatis efficitur. Sed euismod, nisi vel consectetur interdum, nisl nisi cursus enim, ac lacinia erat erat a augue.</p>
      </div>
   </>
}
function Quizes(){
<>
      <div className="menu">
        <Menu />
      </div>
      <div className="content">
        <h1 className="title">Historie IT</h1>
        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nunc nec justo facilisis aliquet. Donec non odio at ligula venenatis efficitur. Sed euismod, nisi vel consectetur interdum, nisl nisi cursus enim, ac lacinia erat erat a augue.</p>
      </div>
   </>
}
function Home(){
  return (
    <>
      <div className="menu">
        <Menu />
      </div>
      <div className="content">
        <h1 className="title">Historie IT</h1>
        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nunc nec justo facilisis aliquet. Donec non odio at ligula venenatis efficitur. Sed euismod, nisi vel consectetur interdum, nisl nisi cursus enim, ac lacinia erat erat a augue.</p>
      </div>
   </>
  );
}
export default App;
