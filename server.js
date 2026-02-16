import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

// Upstox Tokens
const TOKEN = process.env.UPSTOX_ACCESS_TOKEN;


// Instruments
const symbols = [
  "NSE_INDEX|Nifty 50",
  "NSE_INDEX|Nifty Bank",
  "NSE_INDEX|Nifty Fin Service",
  "BSE_INDEX|SENSEX",

  "MCX_FO|GOLD",
  "MCX_FO|SILVER",
  "MCX_FO|CRUDEOIL",
  "MCX_FO|NATURALGAS"
];


// Home
app.get("/",(req,res)=>{
  res.send("Server Running 🚀");
});


// Live Data
app.get("/live", async (req,res)=>{

  try{

    let url = `https://api.upstox.com/v2/market-quote/quotes?symbol=${symbols.join(",")}`;

    let response = await axios.get(url,{
      headers:{
        Authorization:`Bearer ${TOKEN}`
      }
    });

    res.json({
      status:"success",
      data: response.data.data
    });

  }
  catch(err){

    res.json({
      status:"error",
      message:"Upstox API Error"
    });

  }

});


// Start
app.listen(PORT,()=>{
  console.log("Server running on",PORT);
});
