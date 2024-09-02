import React, { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

const FileUpload = ({ file, setFile, setIsLoading, handleFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    handleFiles(uploadedFile);
  };

  const handleFiles = (uploadedFile) => {
    if (uploadedFile) {
      const allowedTypes = ['text/plain', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (allowedTypes.includes(uploadedFile.type)) {
        setFile(uploadedFile);
        setIsLoading(true);
        handleFileUpload(uploadedFile); // Upload the file to the backend
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        alert('Please upload a text, CSV, or Excel file.');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const uploadedFile = e.dataTransfer.files[0];
    handleFiles(uploadedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
  };

  return (
    <div className="w-1/3 pr-8 border-r">
      <h2 className="text-4xl font-bold mb-4">Hi, I'm Shak</h2>
      <h2 className="text-xl mb-8">Your Personal Assistant 😎</h2>
      <ul className="mb-4">
        <li className="flex items-center space-x-2 mb-2">
          <span>◎ Speak to me and I'll translate it for you.</span>
        </li>
        <li className="flex items-center space-x-2 mb-2">
          <span>◎ Upload a text, CSV, or Excel file.</span>
        </li>
        <li className="flex items-center space-x-2 mb-2">
          <span>◎ Ask me a question and I'll answer it.</span>
        </li>
        <li className="flex items-center space-x-2 mb-2">
          <span>◎ Click on the settings icon to configure languages.</span>
        </li>
      </ul>
      <div
        className={`mb-6 p-6 border-2 border-dashed rounded-xl ${
          dragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="block font-bold mb-2">Drag & Drop or Upload File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded-xl w-full mb-2"
          accept=".txt,.csv,.xlsx"
          ref={fileInputRef} // Attach the ref to the input element
        />
        {file && (
          <div className="mt-2 flex justify-between items-center border-2 bg-green-100 rounded-lg p-2">
            <span>{file.name}</span>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
