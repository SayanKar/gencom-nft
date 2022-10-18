// import logo from './logo.svg';
import './App.css';
import CanvasGrid from './components/CanvasGrid';

function App() {
  return (
    <div className="App">
      <CanvasGrid rows={32} columns={32}/>
    </div>
  );
}

export default App;
