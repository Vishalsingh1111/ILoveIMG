import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import uploadImgRouter from './Routes/File.route.js';
import DBconnection from './Database/db.js';
import mailRouter from './Routes/Mailer.route.js';
import fileRoutes from './Routes/File.route.js';
import converterRouter from './Routes/converter.route.js';

// Load environment variables from .env file
dotenv.config();

// Custom __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Set up CORS
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use the routes
app.use('/', uploadImgRouter);
app.use('/', mailRouter);
app.use('/api', fileRoutes);
app.use('/', converterRouter);

// Create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Connect to the database
DBconnection();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
