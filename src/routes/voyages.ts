import express from 'express';
import {
  getAllVoyages,
  getVoyageById,
  createVoyage,
  updateVoyage,
  deleteVoyage
} from '../controllers/voyageController';

export const router = express.Router();

router.get('/', getAllVoyages);
router.get('/:id', getVoyageById);
router.post('/', createVoyage);
router.put('/:id', updateVoyage);
router.delete('/:id', deleteVoyage);