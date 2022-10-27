// import logo from './logo.svg';
import "./App.css";

import CanvasGrid from "./components/CanvasGrid";
import CanvasRoom from "./components/CanvasRoom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import CreateRoom from "./components/CreateRoom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DisplayCard from "./components/DisplayCard";
import CardList from "./components/CardList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/canvas/:canvasId" element={<CanvasRoom />} />
        <Route path="/create" element={<CreateRoom/>}/>        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
