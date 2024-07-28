// /api/download.js

const fs = require("fs");
const path = require("path");

const pricesFilePath = path.join(process.cwd(), "prices.json");

export default function handler(req, res) {
  fs.readFile(pricesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Error reading JSON file");
      return;
    }

    res.setHeader("Content-Disposition", 'attachment; filename="prices.json"');
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  });
}
