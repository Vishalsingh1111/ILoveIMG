import React, { useState } from 'react';
import axios from 'axios';
import { FaFileImage } from 'react-icons/fa';
import Navbar from './Navbar'; // Import your Navbar component
import { baseUrl } from '../../baseUrl'; // Set your base URL

const Blackwhite = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
        } else {
            setMessage("Please drop a valid image file.");
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setMessage("Processing your file...");

        try {
            const response = await axios.post(
                `${baseUrl}/blackwhiteimage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    responseType: 'blob',
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'black_and_white_image.png');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setMessage("Image converted to black and white and downloaded successfully!");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setMessage("Error in converting image.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto container pt-5 px-6 md:px-40 min-h-screen">
                <div className="items-center justify-center mx-auto">
                    <div className="text-center pt-20 mb-10">
                        <h1 className="text-4xl md:text-4xl text-black mb-2 font-semibold">
                            Convert Image to Black and White
                        </h1>
                        <p className="text-2xl text-gray-500">
                            Easily convert your colorful images to black and white.
                        </p>
                    </div>

                    <div
                        className={`flex flex-col md:flex-row max-w-screen-2xl mx-auto px-4 py-2 md:px-8 md:py-6 ${isDragging ? 'bg-blue-100' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className={`flex-1 ${selectedFile ? 'md:mr-4' : ''} mb-8 md:mb-0`}>
                            {!selectedFile ? (
                                <div className="text-center">
                                    <FaFileImage className="text-5xl lg:w-[10%] lg:h-[10%] sm:w-[50%] sm:h-[50%] mx-auto text-blue-500 mb-8" />
                                    <div className="text-3xl">Drag and Drop Images Here</div>
                                    <div className="my-4 font-bold text-2xl">OR</div>
                                    <label
                                        htmlFor="FileInput"
                                        className="items-center justify-center px-20 py-5 rounded-lg shadow-lg cursor-pointer bg-blue-500 text-white mt-10">
                                        <span className="text-2xl text-white">Browse File</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="FileInput"
                                    />
                                </div>
                            ) : (
                                <div className="text-center md:text-left shadow rounded-lg p-10 bg-white">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected"
                                        className="max-w-full h-auto mb-4"
                                    />
                                    <span className="pt-5 text-md">{selectedFile.name}</span>
                                </div>
                            )}
                        </div>
                        {selectedFile && (
                            <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0 space-y-4 mx-auto">
                                <label
                                    htmlFor="SecondFileInput"
                                    className="items-center justify-center px-20 py-5 rounded-lg shadow-lg cursor-pointer bg-blue-500 text-white mb-4">
                                    <span className="text-xl text-white">Browse New File</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="SecondFileInput"
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedFile}
                                    className="text-white bg-red-500 text-xl hover:bg-red-600 disabled:bg-transparent disabled:pointer-events-none duration-300 px-14 py-5 rounded-lg"
                                >
                                    Black and White Image
                                </button>
                            </div>
                        )}
                    </div>
                    {message && (
                        <p className={`mt-4 text-lg text-center ${message.includes('Error') ? 'text-red-500' : 'text-blue-500'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Blackwhite;
