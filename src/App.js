import MainMint from "./components/MainMint";
import Navbar from "./components/Navbar";
import "./App.css";
import { useState } from "react";

function App() {
  // const [accounts, setAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <div className="App">
        <Navbar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-bg"></div>
    </div>
  );
}

export default App;
