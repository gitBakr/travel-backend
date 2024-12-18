import express from 'express';
import { creerReservation, getReservationsUtilisateur } from '../controllers/reservationController';
import { auth } from '../middleware/auth';

export const router = express.Router();

router.post('/', auth, creerReservation);
router.get('/mes-reservations', auth, getReservationsUtilisateur);