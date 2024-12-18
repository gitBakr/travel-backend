import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const inscription = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, email, motDePasse, telephone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const motDePasseHash = await bcrypt.hash(motDePasse, salt);

    // Créer le nouvel utilisateur
    const utilisateur = new User({
      nom,
      prenom,
      email,
      motDePasse: motDePasseHash,
      telephone
    });

    await utilisateur.save();

    // Créer le token JWT
    const token = jwt.sign(
      { userId: utilisateur._id },
      'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

export const connexion = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier si l'utilisateur existe
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { userId: utilisateur._id },
      'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};