import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { classifyImage } from "../services/api";
import UploadDropzone from "../components/UploadDropzone";
import Button from "../components/Button";
import ImageMeta from "../components/ImageMeta";
import Footer from "../components/Footer";

export default function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    toast.success("Image selected!");
  };

const handleClassify = async () => {
  if (!file) {
    return toast.error("Please select an image first!");
  }

  try {
    const data = await classifyImage(file);

    const previewURL = URL.createObjectURL(file);

    navigate("/result", {
      state: {
        result: data,
        image: previewURL,
      },
    });

  } catch (error) {
    console.error(error);
    toast.error("Server error!");
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 flex items-start justify-center pt-10 px-4">
        <div className="w-full max-w-xl space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400"
          >
            Upload an Image
          </motion.h1>

          <UploadDropzone
            onFileUpload={handleFileUpload}
            className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          />

          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 flex flex-col items-center space-y-2"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="max-h-40 object-contain rounded"
              />
              <ImageMeta file={file} />
            </motion.div>
          )}

          <Button onClick={handleClassify} className="w-full">
            Classify Image
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
