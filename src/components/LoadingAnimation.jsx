import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => (
  <motion.div
    className="flex justify-center items-center space-x-2 mb-4 mt-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="w-3 h-3 bg-green-900 rounded-full"
        animate={{
          y: [0, -10, 0],
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.1,
          },
        }}
      />
    ))}
  </motion.div>
);

export default LoadingAnimation;
