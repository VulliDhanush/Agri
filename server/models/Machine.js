const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rentalPricePerDay: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String, default: 'https://via.placeholder.com/300' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Machine', MachineSchema);
