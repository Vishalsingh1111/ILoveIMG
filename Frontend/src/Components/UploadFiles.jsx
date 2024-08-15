import React, { useState, useEffect, useRef } from 'react';
import { uploadFile } from '../Services/Api';
import { FaUpload } from "react-icons/fa";
import ShareModal from './ShareModal';
import Navbar from './Navbar';
import { baseUrl } from '../../baseUrl';

const UploadFiles = () => {
  const [files, setFiles] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFileLink, setCurrentFileLink] = useState('');
  const dropRef = useRef(null);

  useEffect(() => {
    const uploadFilesToServer = async () => {
      const updatedFiles = await Promise.all(
        files.map(async (file) => {
          if (file.status === 'Uploading') {
            const formData = new FormData();
            formData.append("name", file.name);
            formData.append("file", file.rawFile);

            try {
              const res = await uploadFile(formData);
              return {
                ...file,
                progress: 100,
                status: 'Uploaded',
                downloadLink: res.path,
              };
            } catch (error) {
              console.error('Upload failed', error);
              return {
                ...file,
                status: 'Failed',
              };
            }
          }
          return file;
        })
      );

      setFiles(updatedFiles);
    };

    if (files.some(file => file.status === 'Uploading')) {
      uploadFilesToServer();
    }
  }, [files]);

  const handleFileCancel = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map(file => ({
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
      progress: 0,
      status: 'Uploading',
      rawFile: file,
    }));

    setFiles([...files, ...uploadedFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files).map(file => ({
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
      progress: 0,
      status: 'Uploading',
      rawFile: file,
    }));

    setFiles([...files, ...uploadedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (dropRef.current) {
      dropRef.current.classList.add('border-green-600');
    }
  };

  const handleDragLeave = () => {
    if (dropRef.current) {
      dropRef.current.classList.remove('border-green-600');
    }
  };

  const openShareOptions = (fileIndex) => {
    setCurrentFileLink(files[fileIndex].downloadLink);
    setShowShareOptions(fileIndex);
    setModalVisible(true);
  };

  const handleShare = async (email, downloadLink) => {
    try {
      const response = await fetch(`${baseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, downloadLink }),
      });

      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }

    setModalVisible(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 w-full mx-auto flex flex-col gap-8">
          <section className='text-center md:mx-10 mt-20'>
            <h1 className='text-4xl md:text-4xl mb-3 font-semibold mt-6'>UPLOAD FILE TO GENERATE LINK</h1>
            <span className='text-2xl text-gray-500'>Upload documents you want to share and generate link and share it.</span>
          </section>
          <section className={`flex flex-col ${files.length === 0 ? 'md:flex-row' : 'md:flex-col lg:flex-row'} gap-8 md:mx-10`}>
            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className="flex-1 max-w-xl mx-auto content-center text-center">
              <FaUpload className="text-5xl w-[30%] h-[30%] mx-auto text-blue-500 mb-8" />
              <div className="text-3xl">Drag and drop files here</div>
              <div className="my-4 font-bold text-2xl">OR</div>
              <input
                type="file"
                multiple
                className="hidden"
                id="fileInput"
                onChange={handleFileUpload}
              />
              <button
                className="bg-blue-500 text-white text-xl py-4 px-20 rounded-xl"
                onClick={() => document.getElementById('fileInput').click()}
              >
                Browse Files
              </button>
            </div>

            {files.length > 0 && (
              <div className="flex-1 overflow-auto h-[430px] md:min-h-[400px] mb-10 ">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-left">Uploaded Files</h2>
                {files.map((file, index) => (
                  <div key={index} className="mb-4 flex flex-col border p-4 rounded-lg bg-white shadow">
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <span className={`inline-block w-10 h-10 mr-2 px-2 rounded ${file.type === 'PDF' ? 'bg-blue-500' : file.type === 'EPS' ? 'bg-red-500' : 'bg-purple-500'} text-white flex items-center justify-center`}>
                            {file.type}
                          </span>
                          <span className="font-medium">{file.name}</span>
                        </div>
                        <span className="text-red-600 text-md ml-auto">{file.status}</span>
                      </div>
                      <div className="relative h-1 bg-blue-200 rounded-full mb-2">
                        <div className="absolute top-0 left-0 h-full rounded-full" style={{ width: `${file.progress}%`, backgroundColor: file.type === 'PDF' ? '#60a5fa' : file.type === 'EPS' ? '#ef4444' : '#8b5cf6' }}></div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4 mt-2">
                      {file.status === 'Uploaded' ? (
                        <>
                          <div className="flex-1 flex space-x-2 text-sm">
                            <a href={file.downloadLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 p-1.5 px-2 text-white rounded">Download</a>
                            <button onClick={() => openShareOptions(index)} className="bg-green-500 px-4 text-white rounded">Share</button>
                            <button onClick={() => handleFileCancel(file.name)} className="bg-red-500 px-2 text-white rounded">Cancel</button>
                          </div>
                        </>
                      ) : (
                        <button onClick={() => handleFileCancel(file.name)} className="text-red-500 text-sm">Cancel</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <ShareModal
          showModal={modalVisible}
          onClose={() => setModalVisible(false)}
          onShare={handleShare}
          downloadLink={currentFileLink}
        />
      </div>
    </>
  );
};

export default UploadFiles;
