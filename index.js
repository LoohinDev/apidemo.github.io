require("dotenv").config();
const express = require("express");
const connectDB = require("./server");
const publishApi =  require("./routes/publish")

const app = express();
connectDB();

app.use(express.json());

app.use("/api/cms-demo", publishApi);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
