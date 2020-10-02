const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: { type: String, required: [true, "title is required"] },
  description: { type: String, required: [true, "description is required"] },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
