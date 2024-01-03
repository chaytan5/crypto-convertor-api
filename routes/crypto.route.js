const express = require("express");
const router = express.Router();
const axios = require("axios");
const { removeDuplicates } = require("../utils/functions");

router.get("/fiat/list", async (req, res) => {
	try {
		const response = await axios.get(
			"https://pro-api.coinmarketcap.com/v1/fiat/map",
			{
				params: {
					limit: 100,
					sort: "id",
				},
				headers: {
					"X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
				},
			}
		);

		res.json({
			data: response.data,
		});
	} catch (error) {
		console.log(error);
	}
});

router.get("/crypto/list", async (req, res) => {
	try {
		const response = await axios.get(
			"https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
			{
				params: {
					limit: 100,
					sort: "cmc_rank",
				},
				headers: {
					"X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
				},
			}
		);

		const resData = response.data.data;

		const uniqueArray = removeDuplicates(resData, "id");

		res.json({
			data: uniqueArray,
		});
	} catch (error) {
		console.log(error);
		res.json({
			error: true,
			errorText: error.message,
		});
	}
});

router.post("/convert", async (req, res) => {
	try {
		if (!req.body.crypto || !req.body.fiat || !req.body.amount)
			throw new Error("Invalid request");

		const { crypto, fiat, amount } = req.body;

		const response = await axios.get(
			"https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
			{
				params: {
					symbol: crypto,
					convert: fiat,
				},
				headers: {
					"X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
				},
			}
		);

		const data = response.data.data;
		const quote = Object.values(data)[0][0].quote;
		const price = Object.values(quote)[0].price;
		const convertedAmount = amount * price.toFixed(4);

		res.json({
			convertedAmount,
			fiat,
		});
	} catch (error) {
		console.log(error);
		res
			.json({
				error: true,
				errorText: error.message,
			})
			.status(400);
	}
});

module.exports = router;
