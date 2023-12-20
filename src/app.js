const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const userRouter = require("./app/user/route");
const categoryRouter = require("./app/category/route");
const productRouter = require("./app/product/route");
const campaignRouter = require("./app/campaign/route");
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).send("Server is currently running");
});

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/campaign", campaignRouter);

module.exports = app;
