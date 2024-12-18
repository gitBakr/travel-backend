import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { Voyage } from '../models/Voyage';

export const creerReservation = async (req: Request, res: Response) => {
  try {
    const { voyageId, modePaiement, pourcentagePaye } = req.body;
    const utilisateurId = (req as any).userId; // Récupéré du middleware d'authentification

    // Vérifier si le voyage existe
    const voyage = await Voyage.findById(voyageId);
    if (!voyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    // Calculer le montant à payer selon le pourcentage
    let montantPaye = voyage.prix;
    switch (pourcentagePaye) {
      case 'Quart':
        montantPaye = voyage.prix * 0.25;
        break;
      case 'Moitié':
        montantPaye = voyage.prix * 0.5;
        break;
      case 'Totalité':
        montantPaye = voyage.prix;
        break;
    }

    const reservation = new Reservation({
      utilisateur: utilisateurId,
      voyage: voyageId,
      montantPaye,
      modePaiement,
      pourcentagePaye
    });

    await reservation.save();

    res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la réservation' });
  }
};

export const getReservationsUtilisateur = async (req: Request, res: Response) => {
  try {
    const utilisateurId = (req as any).userId;
    const reservations = await Reservation.find({ utilisateur: utilisateurId })
      .populate('voyage')
      .exec();

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
  }
};