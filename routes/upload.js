const express = require("express");
const {upload} = require("../config/multer");
const {fileUpload} = require("../controllers/Upload_Controller");
const {multerUpload} = require("../config/multer");
const {verifyToken , verifyTokenUser} = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/image" , upload.single("file"), fileUpload);
module.exports = router;