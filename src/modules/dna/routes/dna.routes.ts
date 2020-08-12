import express from 'express';
import '../models/dna.model';
import MutationController from '../controllers/dna.controller';
const router = express.Router();

router.post('/api/mutation', MutationController.checkSequence);
router.get('/api/stats', MutationController.getMutationStats);

export default router;
