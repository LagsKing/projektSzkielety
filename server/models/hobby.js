const mongoose = require('mongoose');

const hobbySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  hobby: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{ timestamps: false });

const Hobby = mongoose.model('Hobby', hobbySchema);

module.exports = Hobby;
