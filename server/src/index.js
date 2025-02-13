const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

// Get All Currencies Names
app.get("/getAllCurrencies", async (req, res) => {
  const nameUrl =
    "https://openexchangerates.org/api/currencies.json?app_id=f4a6fbd8685744389b04775b3fecd260";

  try {
    const namesResponse = await axios.get(nameUrl);
    const nameData = namesResponse.data;

    return res.json(nameData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch currency names" });
  }
});

/// Calculate All Currencies
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amount } = req.query;

  if (!date || !sourceCurrency || !targetCurrency || !amount) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const amountUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=f4a6fbd8685744389b04775b3fecd260`;
    const amountDate = await axios.get(amountUrl);
    const rates = amountDate.data.rates;

    const srcRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    if (!srcRate || !targetRate) {
      return res.status(400).json({ error: "Invalid currency codes" });
    }

    const convertedAmount = (targetRate / srcRate) * amount;

    return res.json( {convertedAmount});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to convert currency" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
