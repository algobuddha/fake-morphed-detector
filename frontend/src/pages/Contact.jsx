/*import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Contact() {
  const contacts = [
    { type: "Email", value: "support@example.com", link: "mailto:support@example.com" },
    { type: "GitHub", value: "Madhurya23/fake-morphed-detector", link: "https://github.com/Madhurya23/fake-morphed-detector" },
    { type: "LinkedIn", value: "diyaa544", link: "https://linkedin.com/in/diyaa544" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 sm:py-24 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact & Info
        </motion.h1>

        <motion.p
          className="text-center text-gray-700 dark:text-gray-200 mb-12 max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Thank you for visiting the Fake & Morphed Image Detection System. 
          This project is purely academic and demonstrates AI-powered image analysis 
          for detecting deepfakes, morphed, or altered images.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-8 w-full">
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-2">{c.type}</h3>
              <a 
                href={c.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline break-words"
              >
                {c.value}
              </a>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}*/

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Button from "../components/Button";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);

  const contacts = [
    {
      type: "Email",
      value: "verivision.team@gmail.com", 
      link: "mailto:verivision.team@gmail.com",
    },
    {
      type: "Phone",
      value: "+91 9876543210", // Replace with your phone number
      link: "tel:+919876543210",
    },
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success("Thank you! Your feedback has been sent.");

    setShowModal(false);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  } catch (error) {
    console.error(error);

    toast.error("Failed to send feedback. Please try again.");
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 sm:py-24 flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-center text-gray-700 dark:text-gray-200 mb-10 max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Thank you for using VeriVision- our Fake & Morphed Image Detection System.
          We value your suggestions and feedback. Feel free to reach out
          using the contact details below or send us your comments through
          the feedback form.
        </motion.p>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl mb-10">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 text-center hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2 + index * 0.2,
                duration: 0.7,
              }}
            >
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                {contact.type}
              </h3>

              <a
                href={contact.link}
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 break-all"
              >
                {contact.value}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <button
    onClick={() => setShowModal(true)}
    className="text-indigo-600 dark:text-indigo-400 hover:underline text-lg font-medium"
  >
    💬 Give Feedback
  </button>
</motion.div>
      </main>
{showModal && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setShowModal(false)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6 mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
          Feedback / Comments
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          name="message"
          rows="3"
          placeholder="Write your feedback..."
          required
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button type="submit" className="w-full">
          Send Feedback
        </Button>
      </form>
    </motion.div>
  </div>
)}
    </div>
  );
}
