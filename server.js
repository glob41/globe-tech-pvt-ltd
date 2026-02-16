const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Upstox details (Render se aayega)
const API_KEY = process.env.UPSTOX_API_KEY;
const ACCESS_TOKEN = process.env.UPSTOX_ACCESS_TOKEN;

// Live market endpoint
app.get("/live", async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ error: "Data nahi mil raha", details: error.message });
  }
});

// Home page
app.get("/", (req, res) => {
  res.send("Live Market Server Running 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
