import express from 'express';
import { convertJPG2PNG, convertPngToGif, convertPNGToJPG, compressImage, resizeImage, CropImage } from '../Controller/imagesConverter.controller.js';
import upload from '../Utils/upload.multer.js';

const router = express.Router();


//images routes

router.post('/jpg2png', upload.single('file'), convertJPG2PNG);

router.post('/png2jpg', upload.single('file'), convertPNGToJPG);

router.post('/png2gif', upload.single('file'), convertPngToGif);

//compression

router.post('/imgcompression', upload.single('file'), compressImage);

router.post('/imgresize', upload.single('file'), resizeImage);

router.post('/cropimage', upload.single('file'), CropImage);
export default router;
