import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voyage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voyage',
    required: true,
  },
  montantPaye: {
    type: Number,
    required: true,
    min: 0,
  },
  modePaiement: {
    type: String,
    enum: ['CB', 'Espèces'],
    required: true,
  },
  pourcentagePaye: {
    type: String,
    enum: ['Quart', 'Moitié', 'Totalité'],
    required: true,
  }
}, {
  timestamps: true
});

export const Reservation = mongoose.model('Reservation', reservationSchema);