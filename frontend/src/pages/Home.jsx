import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import logoLarge from "../assets/logo-large.png";

import Button from "../components/Button";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    ["Secure Media", "Prevent misinformation at scale."],
    ["AI Analysis", "Deep learning powered classification."],
    ["Visual Trust", "Grad-CAM heatmaps & confidence scores."],
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* MAIN CONTENT */}
      <main className="flex-1 flex">
        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            w-full
            min-h-[calc(100vh-140px)]
            flex
            flex-col
            justify-center
          "
        >

          {/* HERO SECTION */}
          <section className="text-center mb-12">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 120,
              }}
              className="flex justify-center mb-6"
            >
              <img
                src={logoLarge}
                alt="VeriVision Logo"
                className="
                  w-28
                  h-28
                  sm:w-32
                  sm:h-32
                  md:w-40
                  md:h-40
                  object-contain
                  select-none
                "
                draggable="false"
              />
            </motion.div>

            {/* App Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                text-5xl
                sm:text-6xl
                lg:text-7xl
                font-black
                gradient-text
                tracking-tight
                mb-3
              "
            >
              VeriVision
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="
                text-lg
                sm:text-xl
                md:text-2xl
                font-semibold
                text-gray-700
                dark:text-gray-300
                mb-5
              "
            >
              AI-Powered Image Authenticity Detection
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
                text-base
                md:text-lg
                text-gray-700
                dark:text-gray-200
                max-w-2xl
                mx-auto
                mb-8
                leading-relaxed
              "
            >
              Detect AI-generated, morphed, and manipulated images instantly
              using deep learning, confidence scoring, and Grad-CAM visual
              explanations.
            </motion.p>

            {/* Upload Button */}
            <Button
              className="px-8 py-3"
              onClick={() => navigate("/upload")}
            >
              Upload Image
            </Button>

          </section>

          {/* FEATURES */}
          <section className="grid md:grid-cols-3 gap-6">

            {features.map(([title, desc], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Card className="p-6 h-full flex flex-col justify-between dark:bg-gray-800">

                  <div>

                    <h3 className="text-lg md:text-xl font-semibold mb-2 dark:text-gray-100">
                      {title}
                    </h3>

                    <p className="text-sm md:text-base leading-snug text-gray-600 dark:text-gray-200">
                      {desc}
                    </p>

                  </div>

                </Card>
              </motion.div>
            ))}

          </section>

        </div>
      </main>

  

    </div>
  );
}