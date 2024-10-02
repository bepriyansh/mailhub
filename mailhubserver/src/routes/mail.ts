import express from 'express';
import { mail } from '../controllers/mail';

const router = express.Router();

router.post('/mail', mail);

export default router;
