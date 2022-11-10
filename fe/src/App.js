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
import Error404 from "./components/Error404";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { CONTRACT_ADDRESS, NETWORK_ENDPOINT } from "./constants";
import { metadata } from "./metadata";
import { web3FromSource } from "@polkadot/extension-dapp";
function App() {
  const [contract, setContract] = useState(null);
  const [activeAccount, setActiveAccount] = useState(null);
  const [api, setApi] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectToContract = async () => {
    const wsProvider = new WsProvider(NETWORK_ENDPOINT);
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, metadata, CONTRACT_ADDRESS);
    setApi(api);
    setContract(contract);
  };

  useEffect(() => {
    connectToContract();
  }, []);

  useEffect(() => {
    const createSigner = async () => {
      activeAccount &&
        setSigner(
          await web3FromSource(activeAccount.meta.source).then(
            (res) => res.signer
          )
        );
    };
    createSigner();
  }, [activeAccount]);
 
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar
          activeAccount={activeAccount}
          setActiveAccount={(acc) => setActiveAccount(acc)}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          <Route
            exact
            path="/canvas"
            element={
              <AllCanvas
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          <Route
            path="/canvas/:canvasId"
            element={
              <CanvasRoom
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          <Route
            path="/create"
            element={
              <CanvasForm
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          <Route
            path="/profile/:address"
            element={
              <Profile
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          <Route
            path="/about"
            element={
              <About
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          <Route
            path="/edit/:canvasId"
            element={
              <CanvasForm
                isEdit={true}
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          />
          {/* <Route
            path="canvas_painter"
            element={
              <CaptureMultipleCells
                activeAccount={activeAccount}
                contract={contract}
                api={api}
                signer={signer}
              />
            }
            errorElement={<Broken />}
          /> */}
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
