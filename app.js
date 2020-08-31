require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const app = express();

///DATABASE CONNECTION
mongoose.connect(
  process.env.DATABASEURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected TO MONGO DATABASE");
  }
);
app.use(express.json({ extended: false }));
///APP Middle Wares
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//APP ROUTES
app.use("/api", authRouter);
app.use("/api", userRouter);
//Connecting
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
