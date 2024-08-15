import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to get the user's Downloads directory
function getDownloadsPath() {
    const userHome = os.homedir();
    return path.join(userHome, 'Downloads');
}

// Function to convert PPTX to PDF
export const convertPPTXToPDF = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const originalFileName = req.file.originalname;
    const fileExtension = path.extname(originalFileName);
    const uniqueId = uuidv4();
    const inputFilePath = path.join(__dirname, '../uploads', `input_${uniqueId}${fileExtension}`);
    const outputFileName = `result_${uniqueId}.pdf`;

    // Save the uploaded file to a unique path
    fs.renameSync(req.file.path, inputFilePath);

    try {
        const formData = new FormData();
        formData.append('instructions', JSON.stringify({
            parts: [
                {
                    file: 'file'
                }
            ]
        }));
        formData.append('file', fs.createReadStream(inputFilePath));

        const response = await axios.post(
            'https://api.pspdfkit.com/build',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': 'Bearer pdf_live_PZOKiBIyEZ8DRIZOjDIoGnG8ybVcE3NWo5LbfnfD6Hq'
                },
                responseType: 'stream'
            }
        );

        // Create a writable stream to the output file in Downloads folder
        const outputFilePath = path.join(getDownloadsPath(), outputFileName);
        const writeStream = fs.createWriteStream(outputFilePath);

        // Pipe the response data to the writable stream
        response.data.pipe(writeStream);

        // Handle completion and errors
        writeStream.on('finish', () => {
            res.json({ message: 'File converted and saved to Downloads', filePath: outputFilePath });
            // Optionally delete the uploaded file after conversion
            fs.unlinkSync(inputFilePath);
        });

        writeStream.on('error', (err) => {
            console.error('Error during file write:', err.message);
            res.status(500).json({ message: 'Error writing PDF file', details: err.message });
        });

    } catch (error) {
        const errorString = await streamToString(error.response.data);
        console.error('Error during conversion:', errorString);
        res.status(500).json({ message: 'Conversion error', details: errorString });
    }
};

// // Function to convert PDF to PPTX
export const convertPDFToPPTX = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const originalFileName = req.file.originalname;
    const fileExtension = path.extname(originalFileName);
    const uniqueId = uuidv4();
    const inputFilePath = path.join(__dirname, '../uploads', `input_${uniqueId}${fileExtension}`);
    const outputFilePath = path.join(getDownloadsPath(), `result_${uniqueId}.pptx`);

    // Save the uploaded file to a unique path
    fs.renameSync(req.file.path, inputFilePath);

    try {
        const formData = new FormData();
        formData.append('instructions', JSON.stringify({
            parts: [
                {
                    file: 'file'
                }
            ],
            output: {
                type: 'pptx'
            }
        }));
        formData.append('file', fs.createReadStream(inputFilePath));

        const response = await axios.post(
            'https://api.pspdfkit.com/build',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': 'Bearer pdf_live_PZOKiBIyEZ8DRIZOjDIoGnG8ybVcE3NWo5LbfnfD6Hq'
                },
                responseType: 'stream'
            }
        );

        response.data.pipe(fs.createWriteStream(outputFilePath));

        response.data.on('end', () => {
            res.json({ pptxUrl: `file://${outputFilePath}` });

            // Optionally delete the uploaded file after conversion
            fs.unlinkSync(inputFilePath);
        });

        response.data.on('error', (err) => {
            console.error('Error during file write:', err.message);
            res.status(500).json({ message: 'Error writing PPTX file', details: err.message });
        });

    } catch (error) {
        const errorString = await streamToString(error.response.data);
        console.error('Error during conversion:', errorString);
        res.status(500).json({ message: 'Conversion error', details: errorString });
    }
};

// Helper function to convert a stream to a string
function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
