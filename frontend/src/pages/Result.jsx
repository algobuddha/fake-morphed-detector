import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AnalysisSteps from "../components/AnalysisSteps";
import Button from "../components/Button";
import ConfidenceBar from "../components/ConfidenceBar";
import Container from "../components/Container";
import Disclaimer from "../components/Disclaimer";
import DownloadReport from "../components/DownloadReport";
import Footer from "../components/Footer";
import HeatmapPreview from "../components/HeatmapPreview";
import HowItWorks from "../components/HowItWorks";
import RiskBadge from "../components/RiskBadge";
export default function Result() {

  const navigate = useNavigate();
  const location = useLocation();

  const { result, image } = location.state || {};

  // -------------------------
  // REDIRECT IF NO DATA
  // -------------------------
  useEffect(() => {

    if (!result || !image) {
      navigate("/upload");
    }

  }, [result, image, navigate]);

  if (!result || !image) return null;

  // -------------------------
  // NORMALIZE SCORES
  // -------------------------
  
  // -------------------------
  // FINAL LABEL
  // -------------------------
  const getLabel = () => {

    if (result.finalLabel === "real") {
      return "REAL IMAGE";
    }

    if (result.finalLabel === "ai") {
      return "AI GENERATED";
    }

    if (result.finalLabel === "morphed") {
      return "MORPHED IMAGE";
    }

    return "UNCERTAIN";
  };

  const label = getLabel();

  return (

    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">

        <Container className="w-full max-w-6xl">

          <div className="grid md:grid-cols-2 gap-6">

            {/* IMAGE */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

              <h2 className="text-xl font-semibold text-center mb-4">
                Uploaded Image
              </h2>

              <HeatmapPreview
  imageUrl={image}
  heatmapUrl={
    result.heatmap
      ? `http://127.0.0.1:5000${result.heatmap}`
      : null
  }
/>
            </div>

            {/* RESULT PANEL */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-5">

              <h2 className="text-2xl font-bold text-center">
                Detection Result
              </h2>

              {/* FINAL RESULT */}
              <RiskBadge
                label={label}
                type={result.finalLabel}
              />

              {/* CONFIDENCE */}
              {/* CONFIDENCE */}
<div className="text-center">

  <p className="text-lg font-medium">
    Confidence:{" "}

    <span className="font-bold">
      {result.confidence.toFixed(1)}%
    </span>

  </p>

</div>

              {/* CONFIDENCE BARS */}
              <ConfidenceBar
  label="Real"
  value={result.real.toFixed(1)}
/>

              <ConfidenceBar
  label="AI Generated"
  value={result.ai.toFixed(1)}
/>

              <ConfidenceBar
  label="Morphed"
  value={result.morphed.toFixed(1)}
/>
              {/* DOWNLOAD REPORT */}
              <DownloadReport
                image={image}
                prediction={result}
              />

              <HowItWorks />

              <AnalysisSteps />

              <Disclaimer />

              {/* BUTTON */}
              <Button
                onClick={() => navigate("/upload")}
                className="w-full"
              >
                Analyze Another Image
              </Button>

            </div>

          </div>

        </Container>

      </main>

      <Footer />

    </div>
  );
}