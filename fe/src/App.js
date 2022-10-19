// import logo from './logo.svg';
import './App.css';
import CanvasGrid from './components/CanvasGrid';
import CanvasRoom from './components/CanvasRoom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      {/* <CanvasGrid rows={32} columns={32}/> */}
      <CanvasRoom/>
    </div>
  );
}

export default App;
