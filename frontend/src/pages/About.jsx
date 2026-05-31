import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function About() {
  const members = [
    { name: "Diya Ghosh"/*, role: "Fullstack Developer", info: "Connected frontend and backend, handled routing, and ensured smooth user experience."*/ },
    { name: "Madhurya Naha"/*, role: "Frontend & UI Designer", info: "Focused on designing responsive layouts and integrating Tailwind CSS with React."*/ },
    { name: "Aishee Bhattacharjee"/*, role: "Backend & AI Integration", info: "Implemented AI models, API endpoints, and managed the database and server logic."*/ },
    { name: "Subhajit Basak"/*, role: "Data & Model Specialist", info: "Worked on AI model training, dataset preparation, and accuracy optimization for detection algorithms."*/},
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 sm:py-24 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About the Project
        </motion.h1>

        <motion.p
          className="text-center text-gray-700 dark:text-gray-200 mb-12 max-w-4xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The Fake & Morphed Image Detector is a cutting-edge AI project designed to identify deepfakes, morphed, and altered images instantly. 
          It leverages state-of-the-art AI models, Grad-CAM visualization, and confidence scoring to ensure reliable detection.
          <br /><br />
          This project is academic but demonstrates real-world applications for media verification, digital security, and misinformation prevention.
        </motion.p>

        <motion.h2
          className="text-3xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
        <br></br>
        <br></br>
          Team Members
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {members.map((m, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-1">{m.name}</h3>
              {/* <p className="text-indigo-600 dark:text-indigo-400 mb-2">{m.role}</p> */}
              {/* <p className="text-gray-700 dark:text-gray-200 text-sm">{m.info}</p> */}
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
