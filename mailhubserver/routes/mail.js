import Express from "express";
import { mail } from "../controllers/mail.js";

const router = Express.Router();

router.post('/mail', mail);

export default router;