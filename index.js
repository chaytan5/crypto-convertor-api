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

let whitelist = [
	"http://localhost:5173",
	"https://crypto-convertor-chi.vercel.app",
];
app.use(
	cors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
				callback(null, true);
			} else {
				console.log(origin);
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: "GET,POST,PUT,DELETE",
		withCredentials: true,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/crypto.route"));

app.listen(PORT, () => {
	console.log(`Server is running on Port: ${PORT}`);
});
