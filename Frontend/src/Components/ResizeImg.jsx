import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import Navbar from './Navbar';
import { baseUrl } from '../../baseUrl';

const ImageResizer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resizeMode, setResizeMode] = useState('px');
    const [maxWidth, setMaxWidth] = useState("");
    const [maxHeight, setMaxHeight] = useState("");
    const [message, setMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (selectedFile) {
            const img = new Image();
            img.src = URL.createObjectURL(selectedFile);

            img.onload = () => {
                if (resizeMode === 'px') {
                    setMaxWidth(img.width);
                    setMaxHeight(img.height);
                } else {
                    setMaxWidth('100');
                    setMaxHeight('100');
                }
            };

            return () => URL.revokeObjectURL(img.src);
        } else {
            setMaxWidth("");
            setMaxHeight("");
        }
    }, [selectedFile, resizeMode]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("maxWidth", maxWidth);
        formData.append("maxHeight", maxHeight);
        formData.append("resizeMode", resizeMode);

        setMessage("Processing your file...");

        try {
            const response = await axios.post(
                `${baseUrl}/imgresize`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    responseType: 'blob'
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', selectedFile.name.replace(/\.[^/.]+$/, '') + '-resized.jpg');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setMessage("File resized and downloaded successfully.");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto container pt-10 px-6 md:px-40 min-h-screen">
                {/* Header Section */}
                <div className="text-center pt-10 mb-10">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-4 mt-4">
                        RESIZE YOUR IMAGES
                    </h1>
                    <p className="text-2xl text-gray-600">
                        Easily resize your image files without installing any software.
                    </p>
                </div>

                {/* Main Content Section */}
                <div className="flex flex-col items-center justify-center">
                    {selectedFile ? (
                        <div className="flex flex-col md:flex-row mx-auto items-center max-w-screen-2xl justify-center">
                            <div
                                className={`flex-1 mb-8 md:mb-0 ${isDragging ? 'border-4 border-dashed border-blue-500' : ''
                                    }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <div className="text-center md:text-left shadow rounded-lg p-10 bg-white">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected"
                                        className="max-w-full h-auto mb-4"
                                    />
                                    <p className="text-lg font-semibold">{selectedFile.name}</p>
                                </div>
                            </div>

                            {/* Form Inputs */}
                            <div className="flex-1">
                                <div className="flex flex-col space-y-4 px-10">
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">{resizeMode === 'px' ? 'Width (px):' : 'Width (%):'}</label>
                                        <input
                                            type="number"
                                            value={maxWidth}
                                            onChange={(e) => setMaxWidth(e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-400 bg-transparent rounded sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">{resizeMode === 'px' ? 'Height (px):' : 'Height (%):'}</label>
                                        <input
                                            type="number"
                                            value={maxHeight}
                                            onChange={(e) => setMaxHeight(e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-400 bg-transparent rounded sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mx-auto content-center justify-center mt-10'>
                                    <label
                                        htmlFor="SecondFileInput"
                                        className="mx-auto px-20 py-4 rounded-lg shadow-lg cursor-pointer bg-blue-500 text-white mb-4"
                                    >
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
                                        className="flex text-white bg-red-700 text-xl mx-auto justify-center hover:bg-red-600 disabled:bg-transparent disabled:pointer-events-none duration-300 px-20 py-4 rounded-lg"
                                    >
                                        Resize Image
                                    </button>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={` max-w-screen-2xl mx-auto  ${isDragging ? 'bg-blue-100' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <FaExpandArrowsAlt className="text-5xl lg:w-[40%] lg:h-[40%] mx-auto text-blue-500 mb-8" />
                            <div className="text-3xl">Drag and Drop Images</div>
                            <div className="my-4 font-bold text-center text-2xl">OR</div>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="hidden"
                                id="FileInput"
                            />
                            <label
                                htmlFor="FileInput"
                                className="flex justofy-center items-center justify-center px-20 py-4 rounded-lg shadow-lg cursor-pointer bg-blue-500 text-white "
                            >
                                <span className="text-2xl text-white">Browse File</span>
                            </label>
                        </div>
                    )}
                </div>
                {message && (
                    <p className={`mt-4 text-lg text-center ${message.includes('Error') ? 'text-red-500' : 'text-blue-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </>
    );
};

export default ImageResizer;
