import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
    path: { type: String, required: true },
    name: { type: String, required: true },
    downloadContent: { type: Number, required: true, default: 0 }
})

const File = mongoose.model('File', filesSchema);
export default File;