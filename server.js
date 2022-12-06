require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passportSetup = require("./passport");
const authRouter = require("./routes/auth");
const nahtais = require('./routes/nahtaias')
//app initialization
const app = express();
const port = process.env.PORT ;


//db initilization
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening for incoming requests
    app.listen(port, () => {
      console.log(
        "Server connected successfuly to db.....\nServer started listening on port ",
        port
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });


//json body
app.use(express.json());

//cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PATCH", "POST", "DELETE"],
  })
);

//logging middleware
const logReq = (req, res, next) => {
  console.log(req.url, req.method);
  next();
};
app.use(logReq);



//routes
app.use("/auth", authRouter);
app.use('/nahtais',nahtais)
