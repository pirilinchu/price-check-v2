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
            // Add other headers from the screenshot
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            // The following headers are typically controlled by the browser and should not be set in fetch():
            // "Referer": "http://localhost:3000", (Not typically set by client-side code)
            // "Origin": "http://localhost:3000", (Set by the browser, and you may not override it)
            // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36" (Cannot be set in fetch())
            // "Sec-Ch-Ua": ""Not A;Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"" (Cannot be set in fetch())
            // "Sec-Ch-Ua-Mobile": "?0" (Cannot be set in fetch())
            // "Sec-Ch-Ua-Platform": ""macOS"" (Cannot be set in fetch())
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
