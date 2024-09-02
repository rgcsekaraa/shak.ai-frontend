import React from 'react';
import { FaTimes } from 'react-icons/fa';

const languages = [
  { code: 'en-US', name: 'English (United States)' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'hi-IN', name: 'Hindi' },
];

const SettingsModal = ({ isOpen, onClose, inputLanguage, setInputLanguage, outputLanguage, setOutputLanguage }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 9999 }}  // Ensure this is the highest z-index
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-1/3 relative">
        {/* X Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Configure Languages</h2>

        <div className="mb-4">
          <label className="block font-bold mb-2">Input Language</label>
          <select
            value={inputLanguage}
            onChange={(e) => setInputLanguage(e.target.value)}
            className="p-2 border rounded w-full"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Output Language</label>
          <select
            value={outputLanguage}
            onChange={(e) => setOutputLanguage(e.target.value)}
            className="p-2 border rounded w-full"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
