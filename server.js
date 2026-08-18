const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Option = require("./models/Option")

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




app.post("/api/options", async (req, res) => {
try {
const option = new Option(req.body);
const savedOption = await option.save();

res.status(201).json(savedOption);
} catch (error) {
res.status(400).json({
message: "Option konnte nicht gespeichert werden."
});
}
});