const express = require("express");
const router = express.Router();

const cryptoController = require("../controllers/crypto.controller");

router.get("/fiat/list", cryptoController.getFiatList);

router.get("/crypto/list", cryptoController.getCryptoList);

router.post("/convert", cryptoController.convertCryptoToFiat);

module.exports = router;
