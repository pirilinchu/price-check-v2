// /api/download.js

const fs = require("fs");
const path = require("path");

const pricesFilePath = path.join(process.cwd(), "prices.json");

export default function handler(req, res) {
  res.setHeader("Content-Disposition", 'attachment; filename="prices.json"');
  res.setHeader("Content-Type", "application/json");
  fs.createReadStream(pricesFilePath).pipe(res);
}
