const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LanguageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports =  Language = mongoose.model("languages", LanguageSchema);
