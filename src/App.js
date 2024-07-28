import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [buyPrice, setBuyPrice] = useState("...");
  const [sellPrice, setSellPrice] = useState("...");
  const [buyUSDPrice, setBuyUSDPrice] = useState("...");

  useEffect(() => {
    const fetchData = async (tradeType) => {
      const response = await fetch(`/api/proxy?tradeType=${tradeType}`);
      const data = await response.json();
      return data.data[0].adv.price;
    };

    fetchData("BUY").then((price) => setBuyPrice(price));
    fetchData("SELL").then((price) => setSellPrice(price));
    fetchData("BUY_USD").then((price) => setBuyUSDPrice(price));
  }, []);

  const handleDownload = () => {
    fetch("/api/download")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "prices.json");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) =>
        console.error("Error downloading the JSON file:", error)
      );
  };

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

        <a
          onClick={handleDownload}
          className="card"
          style={{ cursor: "pointer" }}
        >
          <h2>Data</h2>
          <p>
            <span style={{ fontSize: "smaller" }}>.json</span>
          </p>
        </a>
      </div>
    </main>
  );
}

export default App;
