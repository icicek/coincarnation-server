const express = require("express");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

console.log("🚀 Server initializing...");

// 💥 Tüm kaynaklara CORS izni veriyoruz (test ortamı için)
app.use(cors());

app.use(express.json());

app.use(session({
  secret: "coincarnationSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// ROTAYI TRY-CATCH İLE SARMALIYORUZ
try {
  app.use("/coincarne", require("./routes/coincarne"));
  console.log("✅ Route /coincarne loaded");
} catch (err) {
  console.error("❌ Failed to load /coincarne route:", err);
}

app.get("/", (req, res) => {
  res.send("🧠 Coincarne Auth Server Running");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🔐 Auth server running on port ${PORT}`);
});
