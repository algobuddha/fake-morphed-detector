import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function About() {
  const members = [
    {
      name: "Diya Ghosh",
      linkedin: "https://linkedin.com/in/diyaa544",
    },
    {
      name: "Madhurya Naha",
      linkedin: "https://www.linkedin.com/in/madhurya-naha/",
    },
    {
      name: "Aishee Bhattacharjee",
      linkedin: "https://www.linkedin.com/in/aishee-bhattacharjee-589073253/",
    },
    {
      name: "Subhajit Basak",
      linkedin: "https://www.linkedin.com/in/subhajit-basak-algobuddha/",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 sm:py-24 flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About the Project
        </motion.h1>

        {/* Project Description */}
        <motion.p
          className="text-center text-gray-700 dark:text-gray-200 mb-12 max-w-4xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          VeriVision- Our Fake & Morphed Image Detector is an AI-powered application
          developed to identify authentic, AI-generated, and morphed facial
          images with high accuracy. The system employs a two-stage
          classification approach along with Grad-CAM visualization and
          confidence scoring to improve transparency and interpretability of
          predictions.
          <br />
          <br />
          This project demonstrates the practical application of deep learning
          in digital image forensics, media verification, and combating visual
          misinformation.
        </motion.p>

        {/* Team Heading */}
        <motion.h2
          className="text-3xl font-semibold mb-10 text-center text-indigo-600 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Team Members
        </motion.h2>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6 + index * 0.15,
                duration: 0.7,
              }}
            >
              <h3 className="text-lg font-semibold mb-2">
                {member.name}
              </h3>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View LinkedIn Account
              </a>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}