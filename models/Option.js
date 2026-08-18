const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
name: {
type: String,
required: true
},
category: {
type: String,
required: true
},
emoji: {
type: String,
required: true
}
});

module.exports = mongoose.model("Option", optionSchema);