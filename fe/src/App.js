import "./App.css";
import CanvasRoom from "./components/CanvasRoom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import CreateRoom from "./components/CreateRoom";
import Footer from "./components/Footer";
import Error from "./components/Error";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AllCanvas from "./components/AllCanvas";
import Profile from "./components/Profile";
import About from "./components/About";



function App() {
  const [contract, setContract] = useState(null);
  const [activeAccount, setActiveAccount] = useState();
  const [network, setNetwork] = useState({ url: "", address: "" });

  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={<HomePage />}
              errorElement={<Error />}
            />
            <Route exact path="/canvas" element={<AllCanvas />} />
            <Route path="/canvas/:canvasId" element={<CanvasRoom />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/profile/:address" element={<Profile />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
