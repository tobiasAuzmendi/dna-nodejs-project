import express from 'express';
import EmailController from '../controllers/email.controller';
const router = express.Router();

router.post('/api/email', EmailController.sendEmail);

export default router;
