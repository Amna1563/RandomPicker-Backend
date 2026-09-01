const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Option = require("./models/Option")
const Category = require("./models/Category")

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



app.get("/api/options", async (req, res) => {
try {
const options = await Option.find();

res.json(options);
} catch (error) {
res.status(500).json({
message: "Optionen konnten nicht geladen werden."
});
}
});



app.put("/api/options/:id", async (req, res) => {
try {
const option = await Option.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);

if (!option) {
return res.status(404).json({
message: "Option nicht gefunden."
});
}

res.json(option);
} catch (error) {
res.status(400).json({
message: "Option konnte nicht geändert werden."
});
}
});




app.delete("/api/options/:id", async (req, res) => {
try {
const option = await Option.findByIdAndDelete(req.params.id);

if (!option) {
return res.status(404).json({
message: "Option nicht gefunden."
});
}

res.json({
message: "Option wurde gelöscht."
});
} catch (error) {
res.status(400).json({
message: "Option konnte nicht gelöscht werden."
});
}
});



app.get("/api/options/random", async (req, res) => {
try {
const category = req.query.category;

let options;

if (category) {
options = await Option.find({ category: category });
} else {
options = await Option.find();
}

if (options.length === 0) {
return res.status(404).json({
message: "Keine Optionen vorhanden."
});
}

const randomIndex = Math.floor(Math.random() * options.length);
const randomOption = options[randomIndex];

res.json(randomOption);

} catch (error) {
res.status(500).json({
message: "Zufällige Option konnte nicht ausgewählt werden."
});
}
});







// ========================================
// CATEGORIES
// ========================================



// GET - Alle Kategorien
app.get("/api/categories", async (req, res) => {
try {
const categories = await Category.find().sort({ name: 1 });

res.json(categories);
} catch (error) {
res.status(500).json({
message: "Kategorien konnten nicht geladen werden."
});
}
});









