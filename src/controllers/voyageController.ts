import { Request, Response } from 'express';
import { Voyage } from '../models/Voyage';

export const getAllVoyages = async (req: Request, res: Response) => {
  try {
    const voyages = await Voyage.find();
    res.json(voyages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des voyages' });
  }
};

export const getVoyageById = async (req: Request, res: Response) => {
  try {
    const voyage = await Voyage.findById(req.params.id);
    if (!voyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    res.json(voyage);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du voyage' });
  }
};

export const createVoyage = async (req: Request, res: Response) => {
  try {
    const newVoyage = new Voyage(req.body);
    const savedVoyage = await newVoyage.save();
    res.status(201).json(savedVoyage);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du voyage' });
  }
};

export const updateVoyage = async (req: Request, res: Response) => {
  try {
    const updatedVoyage = await Voyage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVoyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    res.json(updatedVoyage);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du voyage' });
  }
};

export const deleteVoyage = async (req: Request, res: Response) => {
  try {
    const deletedVoyage = await Voyage.findByIdAndDelete(req.params.id);
    if (!deletedVoyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }
    res.json({ message: 'Voyage supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du voyage' });
  }
};