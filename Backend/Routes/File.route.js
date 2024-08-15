import express from 'express'
import { uploadImage, downloadImage } from '../Controller/File.controller.js';
import upload from '../Utils/upload.multer.js';
const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);

router.get('/file/:fileId', downloadImage);

export default router;