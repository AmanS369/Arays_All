// router.js


import multer from 'multer';
import express from 'express';
import {   listImagesInZip } from '../Controller/DocxController.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });
// const storage = multer.memoryStorage(); // This will store the file in memory
// const upload = multer({ storage: storage });


// router.post('/convert',upload.single('docx'),convertImagesToGrayscale);

router.post('/convert',upload.single('file'),listImagesInZip);


export default router