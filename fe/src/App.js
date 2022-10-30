import "./App.css";
import CanvasRoom from "./components/CanvasRoom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import CanvasForm from "./components/CanvasForm";
import Footer from "./components/Footer";
import Broken from "./components/Broken";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AllCanvas from "./components/AllCanvas";
import Profile from "./components/Profile";
import About from "./components/About";
import Loading from "./components/Loading";
import Error404 from "./components/Error404";

function App() {
  const [contract, setContract] = useState(null);
  const [activeAccount, setActiveAccount] = useState(null);
  const [network, setNetwork] = useState({ url: "", address: "" });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          activeAccount={activeAccount}
          setActiveAccount={(acc) => setActiveAccount(acc)}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage />}
            errorElement={<Broken />}
          />
          <Route
            exact
            path="/canvas"
            element={<AllCanvas />}
            errorElement={<Broken />}
          />
          <Route
            path="/canvas/:canvasId"
            element={<CanvasRoom />}
            errorElement={<Broken />}
          />
          <Route
            path="/create"
            element={<CanvasForm />}
            errorElement={<Broken />}
          />
          <Route
            path="/profile/:address"
            element={<Profile />}
            errorElement={<Broken />}
          />
          <Route path="/about" element={<About />} errorElement={<Broken />} />
          <Route
            path="/edit/:canvasId"
            element={<CanvasForm isEdit={true} />}
            errorElement={<Broken />}
          />
          <Route path='*' element={<Error404 />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
