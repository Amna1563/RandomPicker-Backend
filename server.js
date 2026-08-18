const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("RandomPicker Backend läuft!");
});

app.get("/api/test", (req, res) => {
res.json({
message: "Hallo vom RandomPicker Backend!"
});
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
console.log("MongoDB verbunden!");

app.listen(PORT, () => {
console.log(`Server läuft auf http://localhost:${PORT}`);
});
})
.catch((error) => {
console.error("MongoDB Verbindung fehlgeschlagen:", error);
});