import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [buyPrice, setBuyPrice] = useState("...");
  const [sellPrice, setSellPrice] = useState("...");

  useEffect(() => {
    const fetchData = async (tradeType) => {
      const response = await fetch(
        "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fiat: "BOB",
            page: 1,
            rows: 1,
            tradeType: tradeType,
            asset: "USDT",
            countries: [],
            proMerchantAds: false,
            shieldMerchantAds: false,
            publisherType: null,
            payTypes: [],
            classifies: ["mass", "profession"],
          }),
        }
      );
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
