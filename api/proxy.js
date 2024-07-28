// /api/proxy.js

const fetch = require("node-fetch");

export default async function handler(req, res) {
  const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
  const tradeType = req.query.tradeType || req.body.tradeType;

  let bodyPayload = {
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
  };

  if (tradeType === "BUY_USD") {
    bodyPayload = {
      fiat: "USD",
      page: 1,
      rows: 10,
      tradeType: "BUY",
      asset: "USDT",
      countries: [],
      proMerchantAds: false,
      shieldMerchantAds: false,
      publisherType: "merchant",
      payTypes: ["BANK"],
      classifies: ["mass", "profession", "fiat_trade"],
    };
  }

  try {
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error contacting Binance API", error);
    res.status(500).send("Error contacting Binance API");
  }
}
