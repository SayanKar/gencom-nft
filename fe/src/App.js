// import logo from './logo.svg';
import './App.css';
import CanvasGrid from './components/CanvasGrid';
import CanvasRoom from './components/CanvasRoom';
import HomePage from './components/HomePage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DisplayCard from './components/DisplayCard';
import CardList from './components/CardList';

function App() {
  return (
    <div className="App" 
    // style={{display: "flex", justifyContent: "center", padding: "40px"}}
    >
      {/* <CanvasGrid rows={32} columns={32}/> */}
      <CanvasRoom isRoom={false} ids={[1,2,3,4,5,6,7,8]} rows={2} isMain={true}/>
    </div>
  );
}

export default App;
