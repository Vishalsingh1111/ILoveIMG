// import File from "../Model/File.model.js";


// export const uploadImage = async (req, res) => {
//     // console.log(req);
//     const fileObj = {
//         path: req.file.path,
//         name: req.file.originalname
//     }
//     try {
//         const file = await File.create(fileObj);
//         res.status(200).json({ path: `http://localhost:8000/file/${file._id}` })
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: error.message })
//     }
// }


// export const downloadImage = async (req, res) => {
//     try {
//         const file = await File.findById(req.params.fileId);

//         file.downloadCount++;

//         await file.save();

//         res.download(file.path, file.name);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ msg: error.message });
//     }
// }



import fs from 'fs';
import File from "../Model/File.model.js";

export const uploadImage = async (req, res) => {
    const fileObj = {
        path: req.file.path,
        name: req.file.originalname
    };
    try {
        const file = await File.create(fileObj);
        res.status(200).json({ path: `http://localhost:8000/file/${file._id}` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const downloadImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({ msg: "File not found" });
        }

        file.downloadCount++;
        await file.save();

        const filePath = file.path;
        const fileName = file.name;

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error downloading file:', err.message);
                return res.status(500).json({ msg: err.message });
            }

            // Clean up files after download
            try {
                fs.unlinkSync(filePath); // Delete the original file
                console.log(`File ${fileName} deleted successfully.`);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError.message);
            }

            // Optionally, you could delete the file record from the database as well
            // await File.findByIdAndDelete(req.params.fileId);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
};
