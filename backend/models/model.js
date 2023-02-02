const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // trim:true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid Email");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    // unique:true
  },
  messages: [{}],
});

//save message
schema.methods.Messagesave = async function (message) {
  try {
    this.messages = this.messages.concat({ message });
    await this.save();
    return message;
  } catch (error) {
    console.log(error);
  }
};

const users = mongoose.model("users", schema);
module.exports = users;
