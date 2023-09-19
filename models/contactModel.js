const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please enter a name"],
    },
    email: {
      type: "string",
      required: [true, "Please enter the email address"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
