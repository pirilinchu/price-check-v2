import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [buyPrice, setBuyPrice] = useState("...");
  const [sellPrice, setSellPrice] = useState("...");

  useEffect(() => {
    const fetchData = async (tradeType) => {
      const response = await fetch(`/api/proxy?tradeType=${tradeType}`);
      const data = await response.json();
      return data.data[0].adv.price;
    };

    fetchData("BUY").then((price) => setBuyPrice(price));
    fetchData("SELL").then((price) => setSellPrice(price));
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
      </div>
    </main>
  );
}

export default App;
