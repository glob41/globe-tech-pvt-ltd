const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Allow all origins (for GitHub Pages)
app.use(cors({
  origin: "*"
}));

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
          "Api-Version": "2.0"
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.log(err.message);

    res.json({
      error: "Upstox API Error",
      details: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
