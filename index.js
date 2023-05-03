const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/mongoose");
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const upload = require("./routes/upload");
const payment = require("./routes/payment");

dotenv.config({
    origin: 'https://fluffy-blancmange-e9fcc0.netlify.app',
    credentials: true
});

const app = express();

app.use('/api/images' , express.static(path.join(__dirname , '/public/images')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth" , auth);
app.use("/api/user" , user);
app.use("/api/product" , product);
app.use("/api/upload" , upload);
app.use("/api/create-checkout-session" , payment);

const port = process.env.PORT || "5001";

const startServer = async () => {
    try {
        await mongoose.connectDb();
        app.listen(port);
        console.log("Server is Running Successfully On Port:" , port);
    } catch (error) {
        console.log(error);
    }
}

startServer();

