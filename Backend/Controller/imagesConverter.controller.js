import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertJPG2PNG = async (req, res) => {
    try {
        const filePath = req.file.path;
        const outputFilePath = path.join('uploads', `${req.file.filename}.png`);

        await sharp(filePath).png().toFile(outputFilePath);

        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error while sending the file:', err);
                res.status(500).send('Error occurred while downloading the file');
            }

            // Clean up files after download
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
};

//convert png to jpg

export const convertPNGToJPG = async (req, res) => {
    try {
        const filePath = req.file.path;
        const outputFilePath = path.join('uploads', `${req.file.filename}.jpg`);

        await sharp(filePath).jpeg().toFile(outputFilePath);

        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error while sending the file:', err);
                res.status(500).send('Error occurred while downloading the file');
            }

            // Clean up files after download
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
};

// png to gif

export const convertPngToGif = async (req, res) => {
    try {
        const filePath = req.file.path;
        const outputFilePath = path.join('uploads', `${req.file.filename}.gif`);

        await sharp(filePath).gif().toFile(outputFilePath);

        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error while sending the file:', err);
                res.status(500).send('Error occurred while downloading the file');
            }

            // Clean up files after download
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
};

// // Image compression endpoint

export const compressImage = async (req, res) => {
    const { maxSizeKB, quality } = req.body;
    const maxSizeBytes = (parseInt(maxSizeKB) || 300) * 1024; // Convert KB to bytes
    const initialQuality = parseInt(quality) || 80;

    try {
        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname);
        const uniqueName = uuidv4();
        const outputFilePath = path.join('uploads', `${uniqueName}-compressed${fileExt}`);

        let compressionQuality = initialQuality;

        // Function to compress the image
        const compress = async (quality) => {
            return sharp(filePath)
                .jpeg({ quality })
                .toBuffer();
        };

        let compressedBuffer = await compress(compressionQuality);
        let stats = compressedBuffer.length;

        // Iteratively adjust quality to approach the desired file size
        while (stats > maxSizeBytes && compressionQuality > 0) {
            compressionQuality -= 5; // Decrease quality by 5% each iteration
            compressedBuffer = await compress(compressionQuality);
            stats = compressedBuffer.length;
        }

        // If still larger than the target size, try a final adjustment
        if (stats > maxSizeBytes) {
            // Perform a final compression with adjusted quality or resolution if needed
            compressionQuality = Math.max(0, compressionQuality - 10); // Reduce quality more if necessary
            compressedBuffer = await compress(compressionQuality);
            stats = compressedBuffer.length;
        }

        // Write the final compressed image to the file system
        fs.writeFileSync(outputFilePath, compressedBuffer);

        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error while sending the file:', err);
                res.status(500).send('Error occurred while downloading the file');
            }

            // Clean up files after download
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
};






// Crop Image Function
export async function CropImage(req, res) {
    const { file } = req;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Define paths
    const resizedImagePath = path.join(__dirname, '../uploads', 'resized_image.jpg');

    try {

        await sharp(file.path)
            .resize(parseInt(req.body.maxWidth, 10), parseInt(req.body.maxHeight, 10))
            .toFile(resizedImagePath);

        // Serve the file for download
        res.download(resizedImagePath, 'resized_image.jpg', (err) => {
            if (err) {
                console.error('Error while sending the file:', err);
                res.status(500).send('Error occurred while downloading the file');
            }

            // Clean up files after download
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            if (fs.existsSync(resizedImagePath)) fs.unlinkSync(resizedImagePath);
        });
    } catch (error) {
        console.error('Error processing image:', error.message);
        res.status(500).send('Error processing image.');
    }
}


//rsesize image fuction
export async function resizeImage(req, res) {
    const { file } = req;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const outputFilePath = path.join(__dirname, '../uploads', 'resized_image.jpg');

    try {
        const { maxWidth, maxHeight } = req.body;

        // Resize the image while maintaining aspect ratio
        await sharp(file.path)
            .resize(parseInt(maxWidth, 10), parseInt(maxHeight, 10), {
                fit: 'inside', // This ensures the image fits within the given dimensions without cropping
            })
            .toFile(outputFilePath);

        res.download(outputFilePath, 'resized_image.jpg', (err) => {
            if (err) {
                console.error('Error while sending the file:', err);
                res.status(500).send('Error occurred while downloading the file');
            }

            // Clean up files after download
            fs.unlinkSync(file.path);
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        console.error('Error processing image:', error.message);
        res.status(500).send('Error processing image.');
    }
}

