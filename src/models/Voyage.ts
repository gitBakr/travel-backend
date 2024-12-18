import mongoose from 'mongoose';

const voyageSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  dateDepart: {
    type: Date,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  placesDisponibles: {
    type: Number,
    required: true,
    min: 0,
  }
}, {
  timestamps: true
});

export const Voyage = mongoose.model('Voyage', voyageSchema);