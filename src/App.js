import MainMint from "./components/MainMint";
import Navbar from "./components/Navbar";
import "./App.css";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

function App() {
  // const [accounts, setAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isMinting, setIsMinting] = useState(false);
  const [showModal, setShowModal] = useState(true);

  if (isMinting) {
    return (
      <div className="overlay">
        <div className="App">
          <Navbar accounts={accounts} setAccounts={setAccounts} />
          <div className="loader">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              // colors={["#D6517D", "white", "green"]}
            />
            <h3>Minting! Please Wait</h3>
          </div>
        </div>
        <div className="moving-bg"></div>
      </div>
    );
  } else {
    return (
      <div className="overlay">
        <div className="App">
          <Navbar accounts={accounts} setAccounts={setAccounts} />
          <MainMint
            accounts={accounts}
            setAccounts={setAccounts}
            setIsMinting={setIsMinting}
          />
        </div>
        <div className="moving-bg"></div>

        {/* // MODAL */}
        {showModal ? (
          <div className="modal">
            <div className="modal-content">
              <div
                onClick={() => setShowModal(false)}
                style={{ float: "right", cursor: "pointer" }}
              >
                X
              </div>
              <p>Congratulation!!! Your RoboPunk NFT is Minted..</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
