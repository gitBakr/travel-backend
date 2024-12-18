import mongoose from 'mongoose';

const voyageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Hajj', 'Omra'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  option: {
    type: String,
    enum: ['Standard', 'Confort', 'VIP'],
    required: true,
  },
  prix: {
    type: Number,
    required: true,
    min: 0,
  }
}, {
  timestamps: true
});

export const Voyage = mongoose.model('Voyage', voyageSchema);