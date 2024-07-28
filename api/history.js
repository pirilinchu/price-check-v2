// /api/history.js

const fs = require("fs");
const path = require("path");

const pricesFilePath = path.join(process.cwd(), "prices.json");

const readPricesFromFile = () => {
  return JSON.parse(fs.readFileSync(pricesFilePath, "utf-8"));
};

export default function handler(req, res) {
  const tradeType = req.query.tradeType;
  const prices = readPricesFromFile();

  res.status(200).json(prices[tradeType]);
}
