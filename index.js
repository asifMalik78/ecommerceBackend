const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/mongoose");
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const upload = require("./routes/upload");


dotenv.config({
    origin: 'https://comforting-vacherin-c0f470.netlify.app',
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


const port = process.env.PORT || 5001;

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

