const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LanguageSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nativeName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Language = mongoose.model("languages", LanguageSchema);
