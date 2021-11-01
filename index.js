import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { readdirSync } from "fs";

require("dotenv").config();

const app = express();

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection err", err));

//middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server runing on port : ${port}`));
