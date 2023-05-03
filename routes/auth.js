const express = require("express");
const {registerUser , logInUser} = require("../controllers/User_Controller");
const router = express.Router();

router.post("/signup" , registerUser);
router.post("/signin" , logInUser);

module.exports=router;