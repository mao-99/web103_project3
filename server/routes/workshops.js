import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import workshopsController from '../controllers/workshops.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename); // Fix the variable name

const router = express.Router();

router.get('/', workshopsController.getWorkshops);

// router.get('/:workshopID', workshopsController.getWorkshop);

export default router;
