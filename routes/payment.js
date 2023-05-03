const express = require("express")
const {handlePayment} = require("../controllers/Payment_Controller");
const router = express.Router();

router.route("/").post(handlePayment)

module.exports = router;