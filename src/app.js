import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/user.routes.js";
import { bikeRouter } from "./routes/bike.routes.js";

// load .env file
dotenv.config();

// create and setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup server metadata
const PORT = process.env.PORT || 3000;

// setup health route
app.get("/", (req, res) => {
  res.send(`backend running healthily on port ${PORT}`);
});

app.use("/user", userRouter);
app.use("/bike", bikeRouter);

// connect to db and start server
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT || 3000, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("something went wrong: ", error);
  });
