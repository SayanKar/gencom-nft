// import logo from './logo.svg';
import './App.css';
// import CanvasGrid from './components/CanvasGrid';
// import CanvasRoom from './components/CanvasRoom';
import CreateRoom from './components/CreateRoom';

function App() {
  return (
    <div className="App">
      {/* <CanvasGrid rows={32} columns={32}/> */}
      <CreateRoom/>
    </div>
  );
}

export default App;
