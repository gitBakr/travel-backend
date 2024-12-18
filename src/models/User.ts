import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);