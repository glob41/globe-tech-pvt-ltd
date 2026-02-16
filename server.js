const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS
app.use(cors());

// Upstox Token (Render Environment se aayega)
const ACCESS_TOKEN = process.env.UPSTOX_ACCESS_TOKEN;

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// Live Market Route
app.get("/live", async (req, res) => {
  try {
    if (!ACCESS_TOKEN) {
      return res.json({ error: "Access Token Missing" });
    }

    const response = await axios.get(
      "https://api.upstox.com/v2/market-quote/ltp?instrument_key=NSE_INDEX|Nifty%2050",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Api-Version": "2.0",
        },
      }
    );

    res.json(response.data);

  } catch (err) {
    res.json({
      error: "Upstox API Error",
      details: err.message,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
