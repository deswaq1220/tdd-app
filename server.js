const express = require("express");
const app = express();
const productsRoutes = require("./routes");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://gwgw:qwer1234@cluster0.r4kcqgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Mongodb Connected"))
  .catch((error) => console.error(error));

const PORT = 8080;
const HOST = "0.0.0.0";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/products", productsRoutes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
