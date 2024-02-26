// /api/proxy.js

const fetch = require("node-fetch");

export default async function handler(req, res) {
  // This function will proxy the request to the Binance API
  const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

  // Extract the tradeType from the query parameters or body
  const tradeType = req.query.tradeType || req.body.tradeType;

  try {
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers required by the Binance API here
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
    });

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error contacting Binance API", error);
    res.status(500).send("Error contacting Binance API");
  }
}
