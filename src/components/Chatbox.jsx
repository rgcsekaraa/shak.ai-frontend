import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaStop, FaPaperPlane, FaCopy } from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';

const Chatbox = ({ liveTranslation, backendResponse, isLoading, query, setQuery, handleStartStopClick, isRecording, handleSendQuery }) => {

  return (
    <div className="w-2/3 pl-8">
      <motion.div 
        className={`bg-gray-100 p-4 rounded-3xl h-96 overflow-y-auto mb-4 relative ${isLoading ? 'border-4 border-green-500' : ''}`}
        animate={{
          boxShadow: isLoading ? '0 0 0 4px rgba(34, 197, 94, 0.5)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute top-0 left-0 right-0 flex justify-center items-center h-12 bg-green-200 bg-opacity-75"
              style={{ borderBottomLeftRadius: '80%', borderBottomRightRadius: '80%' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingAnimation />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative mt-4">
  <div className="relative flex justify-end items-center mb-4">
    <div className="bg-blue-100 text-black p-3 rounded-lg max-w-xs shadow-md">
      <strong>You:</strong> {liveTranslation}
    </div>
    <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full"></div>
  </div>
  {backendResponse && (
    <div className="relative flex justify-start items-center mb-4">
      <div className="mr-2 w-4 h-4 bg-green-500 rounded-full"></div>
      <div className="bg-green-300 text-black p-3 rounded-lg max-w-xs shadow-md">
        <strong>Shak:</strong> {backendResponse}
      </div>
    </div>
  )}
</div>


      </motion.div>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border rounded-xl"
          placeholder="Ask Shak..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
        />
        <button
          onClick={handleStartStopClick}
          className={`p-4 ml-4 mr-2 rounded-3xl ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white hover:opacity-80 transition flex items-center justify-center`}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>
        <button
          onClick={handleSendQuery}
          className=" p-4 bg-blue-500 mr-4 rounded-3xl text-white hover:bg-blue-600 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
