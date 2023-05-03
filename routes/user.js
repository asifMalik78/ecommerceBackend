const express = require("express");
const router = express.Router();
const {verifyToken , verifyTokenAdmin , verifyTokenUser , verifyTokenUserAdmin } = require("../middlewares/verifyToken");
const {updateUser , getUserSingle , getUserAll , deleteUser} = require("../controllers/User_Controller");

// update user
router.put("/:id" , verifyToken , verifyTokenUser , updateUser);

// delete user
router.delete("/:id" , verifyToken , verifyTokenUserAdmin , deleteUser);

// get all user
router.get("/all" , verifyToken , verifyTokenAdmin , getUserAll);

// get Single User
router.get("/:id" , verifyToken , verifyTokenUserAdmin , getUserSingle);


module.exports = router;