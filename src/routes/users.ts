import express from 'express';
import { inscription, connexion } from '../controllers/userController';

export const router = express.Router();

router.post('/inscription', inscription);
router.post('/connexion', connexion);