const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Redlist dosyasını oku
function loadRedlist() {
  const redlistPath = path.join(__dirname, "..", "data", "redlist_tokens.json");
  const raw = fs.readFileSync(redlistPath);
  return JSON.parse(raw);
}

// POST /coincarne
router.post("/", (req, res) => {
  const { tokenAddress } = req.body;

  if (!tokenAddress) {
    return res.status(400).json({ error: "Token address is required." });
  }

  const redlist = loadRedlist();

  if (redlist.includes(tokenAddress)) {
    return res.status(403).json({ error: "This token is blacklisted and cannot be coincarnated." });
  }

  return res.status(200).json({ message: "Coincarnation accepted ✅" });
});

module.exports = router;
