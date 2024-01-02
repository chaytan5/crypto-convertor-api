/**
 *  Set up an API endpoint to fetch the top 100 cryptocurrencies and
supported currencies(USD, EUR, etc).

    Set up an API endpoint that takes a source cryptocurrency, amount, and
target currency(EUR, USD, etc) as parameters.

    Use a public API (like Coingecko or Coinmarketcap) to get real-time
exchange rates of cryptocurrencies and top 100 cryptocurrencies.

    Perform the currency conversion(between crypto and selected
currency(USD, EUR, etc) on the server and return the result.
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 7000;

const app = express();

const corsOpts = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	allowedHeaders: ["Content-Type", "x-access-token"],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(corsOpts));

app.use("/api", require("./routes/crypto.route"));

app.listen(PORT, () => {
	console.log(`Server is running on Port: ${PORT}`);
});
