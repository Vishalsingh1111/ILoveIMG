
// import path from 'path';
// import fs from 'fs';
// import os from 'os';
// import { exec } from 'child_process';
// import util from 'util'; // Import the util module
// import { PythonShell } from 'python-shell';
// import { fileURLToPath } from 'url';


// // Custom __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const execPromise = util.promisify(exec);

// // Function to convert PDF to Word
// export const convertPDFToWord = (req, res) => {
//     const filePath = path.join(__dirname, '../uploads', req.file.filename);
//     const outputFilename = req.file.filename.replace('.pdf', '.docx');

//     // Get the path to the user's Downloads folder
//     const downloadsPath = path.join(os.homedir(), 'Downloads');
//     const outputPath = path.join(downloadsPath, outputFilename);

//     const options = {
//         scriptPath: __dirname,
//         pythonPath: '/Users/vishalsingh/Desktop/Movilover/Backend/myenv/bin/python3',
//         args: [filePath, outputPath],
//     };

//     PythonShell.run('convert_pdf_to_word.py', options, (error) => {
//         if (error) {
//             console.error('Python script error:', error);
//             return res.status(500).json({ message: 'Conversion error' });
//         }

//         // Check if the file exists before attempting to download
//         if (fs.existsSync(outputPath)) {
//             console.log('Output path:', outputPath);

//             res.download(outputPath, outputFilename, (err) => {
//                 if (err) {
//                     console.error('Download error:', err);
//                     res.status(500).json({ message: 'Download error' });
//                 } else {
//                     console.log('File downloaded successfully');
//                     fs.unlinkSync(inputFilePath);
//                 }
//             });
//         } else {
//             res.status(500).json({ message: 'File conversion failed' });
//         }
//     });
// };

// // Function to convert DOCX to PDF
// export const convertDOCXToPDF = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filePath = path.join(__dirname, '../uploads', req.file.filename);
//     const outputFilename = req.file.filename.replace('.docx', '.pdf');

//     // Get the path to the user's Downloads folder
//     const downloadsPath = path.join(os.homedir(), 'Downloads');
//     const outputPath = path.join(downloadsPath, outputFilename);

//     const options = {
//         scriptPath: path.join(__dirname, '../Controller'),
//         pythonPath: '/Users/vishalsingh/Desktop/Movilover/Backend/myenv/bin/python3',
//         args: [filePath, outputPath],
//     };

//     PythonShell.run('convert_docx_to_pdf.py', options, (error) => {
//         if (error) {
//             console.error('Python script error:', error);
//             return res.status(500).json({ message: 'Conversion error' });
//         }

//         // Check if the file exists before attempting to download
//         if (fs.existsSync(outputPath)) {
//             console.log('Output path:', outputPath);

//             res.download(outputPath, outputFilename, (err) => {
//                 if (err) {
//                     console.error('Download error:', err);
//                     res.status(500).json({ message: 'Download error' });
//                 } else {
//                     console.log('File downloaded successfully');
//                 }
//             });
//         } else {
//             res.status(500).json({ message: 'File conversion failed' });
//         }
//     });
// };


// // Function to convert Image to PDF
// export const convertImageToPDF = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filePath = path.join(__dirname, '../uploads', req.file.filename);
//     const outputFilename = req.file.filename.replace(/\.[^/.]+$/, '') + '.pdf';

//     // Get the path to the user's Downloads folder
//     const downloadsPath = path.join(os.homedir(), 'Downloads');
//     const outputPath = path.join(downloadsPath, outputFilename);

//     const options = {
//         scriptPath: __dirname,
//         pythonPath: '/Users/vishalsingh/Desktop/Movilover/Backend/myenv/bin/python3',
//         args: [filePath, outputPath],
//     };

//     PythonShell.run('convert_image_to_pdf.py', options, (error) => {
//         if (error) {
//             console.error('Python script error:', error);
//             return res.status(500).json({ message: 'Conversion error' });
//         }

//         // Check if the file exists before attempting to download
//         if (fs.existsSync(outputPath)) {
//             console.log('Output path:', outputPath);

//             res.download(outputPath, outputFilename, (err) => {
//                 if (err) {
//                     console.error('Download error:', err);
//                     res.status(500).json({ message: 'Download error' });
//                 } else {
//                     console.log('File downloaded successfully');
//                 }
//             });
//         } else {
//             res.status(500).json({ message: 'File conversion failed' });
//         }
//     });
// };




import path from 'path';
import fs from 'fs';
import os from 'os';
import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';

// Custom __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert PDF to Word
export const convertPDFToWord = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const outputFilename = req.file.filename.replace('.pdf', '.docx');

    // Get the path to the user's Downloads folder
    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const outputPath = path.join(downloadsPath, outputFilename);

    const options = {
        scriptPath: __dirname,
        pythonPath: '/Users/vishalsingh/Desktop/Movilover/Backend/myenv/bin/python3',
        args: [filePath, outputPath],
    };

    PythonShell.run('convert_pdf_to_word.py', options, (error) => {
        if (error) {
            console.error('Python script error:', error);
            return res.status(500).json({ message: 'Conversion error' });
        }

        // Check if the file exists before attempting to download
        if (fs.existsSync(outputPath)) {
            console.log('Output path:', outputPath);

            res.download(outputPath, outputFilename, (err) => {
                if (err) {
                    console.error('Download error:', err);
                    res.status(500).json({ message: 'Download error' });
                } else {
                    console.log('File downloaded successfully');

                    // Delete both the uploaded and converted files after download
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting uploaded file:', unlinkErr.message);
                        }
                    });

                    fs.unlink(outputPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting converted file:', unlinkErr.message);
                        }
                    });
                }
            });
        } else {
            res.status(500).json({ message: 'File conversion failed' });
        }
    });
};

// Function to convert DOCX to PDF
export const convertDOCXToPDF = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const outputFilename = req.file.filename.replace('.docx', '.pdf');

    // Get the path to the user's Downloads folder
    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const outputPath = path.join(downloadsPath, outputFilename);

    const options = {
        scriptPath: path.join(__dirname, '../Controller'),
        pythonPath: '/Users/vishalsingh/Desktop/Movilover/Backend/myenv/bin/python3',
        args: [filePath, outputPath],
    };

    PythonShell.run('convert_docx_to_pdf.py', options, (error) => {
        if (error) {
            console.error('Python script error:', error);
            return res.status(500).json({ message: 'Conversion error' });
        }

        // Check if the file exists before attempting to download
        if (fs.existsSync(outputPath)) {
            console.log('Output path:', outputPath);

            res.download(outputPath, outputFilename, (err) => {
                if (err) {
                    console.error('Download error:', err);
                    res.status(500).json({ message: 'Download error' });
                } else {
                    console.log('File downloaded successfully');

                    // Delete both the uploaded and converted files after download
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting uploaded file:', unlinkErr.message);
                        }
                    });

                    fs.unlink(outputPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting converted file:', unlinkErr.message);
                        }
                    });
                }
            });
        } else {
            res.status(500).json({ message: 'File conversion failed' });
        }
    });
};

// Function to convert Image to PDF
export const convertImageToPDF = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const outputFilename = req.file.filename.replace(/\.[^/.]+$/, '') + '.pdf';

    // Get the path to the user's Downloads folder
    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const outputPath = path.join(downloadsPath, outputFilename);

    const options = {
        scriptPath: __dirname,
        pythonPath: '/Users/vishalsingh/Desktop/Movilover/Backend/myenv/bin/python3',
        args: [filePath, outputPath],
    };

    PythonShell.run('convert_image_to_pdf.py', options, (error) => {
        if (error) {
            console.error('Python script error:', error);
            return res.status(500).json({ message: 'Conversion error' });
        }

        // Check if the file exists before attempting to download
        if (fs.existsSync(outputPath)) {
            console.log('Output path:', outputPath);

            res.download(outputPath, outputFilename, (err) => {
                if (err) {
                    console.error('Download error:', err);
                    res.status(500).json({ message: 'Download error' });
                } else {
                    console.log('File downloaded successfully');

                    // Delete both the uploaded and converted files after download
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting uploaded file:', unlinkErr.message);
                        }
                    });

                    fs.unlink(outputPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting converted file:', unlinkErr.message);
                        }
                    });
                }
            });
        } else {
            res.status(500).json({ message: 'File conversion failed' });
        }
    });
};
