import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [buyPrice, setBuyPrice] = useState("...");
  const [sellPrice, setSellPrice] = useState("...");
  const [buyUSDPrice, setBuyUSDPrice] = useState("...");

  const fetchData = async (tradeType) => {
    const response = await fetch(`/api/proxy?tradeType=${tradeType}`);
    const data = await response.json();
    return data.data[0].adv.price;
  };

  const refreshData = async () => {
    fetchData("BUY").then((price) => setBuyPrice(price));
    fetchData("SELL").then((price) => setSellPrice(price));
    fetchData("BUY_USD").then((price) => setBuyUSDPrice(price));
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <main className="main">
      <div className="grid">
        <a
          href="https://p2p.binance.com/en/trade/all-payments/USDT?fiat=BOB"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Buy</h2>
          <p>
            <strong>{buyPrice}</strong>{" "}
            <span style={{ fontSize: "smaller" }}>BOB</span>
          </p>
        </a>

        <a
          href="https://p2p.binance.com/en/trade/sell/USDT?fiat=BOB&payment=all-payments"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Sell</h2>
          <p>
            <strong>{sellPrice}</strong>{" "}
            <span style={{ fontSize: "smaller" }}>BOB</span>
          </p>
        </a>

        <a
          href="https://p2p.binance.com/en/trade/buy/USDT?fiat=USD&payment=BANK"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Buy</h2>
          <p>
            <strong>{buyUSDPrice}</strong>{" "}
            <span style={{ fontSize: "smaller" }}>USD</span>
          </p>
        </a>

        <a onClick={refreshData} className="card" style={{ cursor: "pointer" }}>
          <h2>⟳</h2>
          <p>
            <span style={{ fontSize: "smaller" }}>refresh</span>
          </p>
        </a>
      </div>
    </main>
  );
}

export default App;
