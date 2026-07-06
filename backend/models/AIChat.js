const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      role: { type:String, enum: ['user', 'model'], required: true },
      text: { type: String, required:true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});
module.exports = mongoose.model("AIChat", aiChatSchema);