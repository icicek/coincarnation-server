const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

function loadRedlist() {
  const redlistPath = path.join(__dirname, "..", "data", "redlist_tokens.json");
  const raw = fs.readFileSync(redlistPath);
  return JSON.parse(raw);
}

router.post("/", (req, res) => {
  try {
    const { tokenAddress } = req.body;

    if (!tokenAddress) {
      return res.status(400).json({ error: "Token address is required." });
    }

    const redlist = loadRedlist();

    if (redlist.includes(tokenAddress)) {
      return res.status(403).json({ error: "This token is blacklisted and cannot be coincarnated." });
    }

    return res.status(200).json({ message: "Coincarnation accepted ✅" });
  } catch (err) {
    console.error("❌ Server error:", err);  // << konsolda göreceksin
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
