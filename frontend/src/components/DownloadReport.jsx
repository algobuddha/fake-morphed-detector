import React from "react";

import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

import Button from "./Button";

export default function DownloadReport({

  image,

  prediction

}) {

  // =====================================================
  // SCORE BOX
  // =====================================================
  const createScoreBox = (
    label,
    value,
    bg,
    color
  ) => {

    return `
      <div style="
        flex:1;
        background:${bg};
        padding:10px;
        border-radius:12px;
        text-align:center;
        border:1px solid rgba(0,0,0,0.08);
      ">

        <div style="
          font-size:12px;
          font-weight:800;
          color:#000;
          margin-bottom:5px;
        ">
          ${label}
        </div>

        <div style="
          font-size:18px;
          font-weight:900;
          color:${color};
        ">
          ${Number(value).toFixed(2)}%
        </div>

      </div>
    `;
  };

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================
  const handleDownload = async () => {

    // =====================================================
    // HEATMAP URL
    // =====================================================
    let heatmapUrl = null;

    if (prediction.heatmap) {

      if (
        prediction.heatmap.startsWith("http")
      ) {

        heatmapUrl =
          prediction.heatmap;

      } else {

        heatmapUrl =
          `http://127.0.0.1:5000${prediction.heatmap}`;
      }
    }

    // =====================================================
    // CREATE CONTAINER
    // =====================================================
    const container =
      document.createElement("div");

    container.style.width =
      "760px";

    container.style.padding =
      "18px";

    container.style.background =
      "#EEF4FF";

    container.style.fontFamily =
      "Arial, sans-serif";

    container.style.position =
      "absolute";

    container.style.left =
      "-9999px";

    // =====================================================
    // DATE
    // =====================================================
    const today =
      new Date().toLocaleDateString();

    // =====================================================
    // HTML CONTENT
    // =====================================================
    container.innerHTML = `

      <div style="
        background:white;
        border-radius:18px;
        padding:20px;
        border:1px solid #D1D5DB;
      ">

        <!-- TITLE -->
        <h1 style="
          text-align:center;
          color:#111827;
          font-size:34px;
          font-weight:900;
          margin-bottom:12px;
        ">
          VERIFICATION REPORT
        </h1>

        <hr style="
          border:none;
          border-top:1px solid #D1D5DB;
          margin-bottom:14px;
        " />

        <!-- TOP INFO -->
        <div style="
          display:flex;
          justify-content:space-between;
          margin-bottom:16px;
          color:#000;
          font-size:12px;
          font-weight:700;
          line-height:1.8;
        ">

          <div>
            <div>
              <strong>
                Report Type:
              </strong>
              AI / Morphed Image Detection
            </div>

            <div>
              <strong>
                Generated:
              </strong>
              ${today}
            </div>
          </div>

          <div>
            <div>
              <strong>
                Source:
              </strong>
              User Uploaded Image
            </div>

            <div>
              <strong>
                System:
              </strong>
              Fake Image Detector v2.0
            </div>
          </div>

        </div>

        <!-- PREDICTION BOX -->
        <div style="
          background:${
            prediction.finalLabel === "real"
              ? "#DCFCE7"
              : prediction.finalLabel === "ai"
              ? "#FEE2E2"
              : "#FEF3C7"
          };

          border:1px solid ${
            prediction.finalLabel === "real"
              ? "#22C55E"
              : prediction.finalLabel === "ai"
              ? "#EF4444"
              : "#F59E0B"
          };

          border-radius:14px;
          padding:14px;
          text-align:center;
          margin-bottom:16px;
        ">

          <div style="
            font-size:13px;
            color:#000;
            font-weight:900;
            margin-bottom:6px;
          ">
            FINAL PREDICTION
          </div>

          <div style="
            font-size:34px;
            font-weight:900;
            color:#000;
            margin-bottom:4px;
          ">
            ${prediction.finalLabel.toUpperCase()}
          </div>

          <div style="
            font-size:15px;
            font-weight:800;
            color:#000;
          ">
            Confidence Score:
            ${prediction.confidence}%
          </div>

        </div>

        <!-- SCORE BOXES -->
        <div style="
          display:flex;
          gap:10px;
          margin-bottom:18px;
        ">

          ${createScoreBox(
            "REAL",
            prediction.real,
            "#EEF2FF",
            "#4338CA"
          )}

          ${createScoreBox(
            "AI GENERATED",
            prediction.ai,
            "#FEE2E2",
            "#DC2626"
          )}

          ${createScoreBox(
            "MORPHED",
            prediction.morphed,
            "#FEF3C7",
            "#B45309"
          )}

        </div>

        <!-- IMAGE SECTION -->
        <div style="
          display:flex;
          gap:12px;
          margin-bottom:18px;
        ">

          <!-- UPLOADED IMAGE -->
          <div style="flex:1;">

            <div style="
              text-align:center;
              font-size:14px;
              font-weight:900;
              color:#000;
              margin-bottom:8px;
            ">
              UPLOADED IMAGE
            </div>

            <img
              src="${image}"
              crossorigin="anonymous"
              style="
                width:100%;
                height:230px;
                object-fit:cover;
                border-radius:12px;
                border:1px solid #D1D5DB;
              "
            />

          </div>

          <!-- HEATMAP -->
          <div style="flex:1;">

            <div style="
              text-align:center;
              font-size:14px;
              font-weight:900;
              color:#000;
              margin-bottom:8px;
            ">
              AI DETECTION HEATMAP
            </div>

            <img
              src="${heatmapUrl}"
              crossorigin="anonymous"
              style="
                width:100%;
                height:230px;
                object-fit:cover;
                border-radius:12px;
                border:1px solid #D1D5DB;
              "
            />

          </div>

        </div>

        <!-- DETAILED FINDINGS -->
        <div style="
          background:#FAFAFA;
          border:1px solid #E5E7EB;
          border-radius:14px;
          padding:14px;
          margin-bottom:14px;
        ">

          <div style="
            font-size:24px;
            font-weight:900;
            color:#000;
            margin-bottom:10px;
          ">
            DETAILED FINDINGS
          </div>

          <ul style="
  padding-left:22px;
  margin:0;
  color:#000;
  font-size:13px;
  line-height:1.8;
  font-weight:600;
  list-style-type:square;
">

  <li style="margin-bottom:8px;">
    The uploaded image was analyzed using a deep learning based image verification system trained on authentic, AI generated, and manipulated facial datasets.
  </li>

  <li style="margin-bottom:8px;">
    Prediction confidence represents how strongly the model associates the uploaded image with the detected class category.
  </li>

  <li style="margin-bottom:8px;">
    The generated heatmap highlights visual regions that influenced the model prediction during analysis.
  </li>

  <li>
    Facial texture consistency, illumination balance, blending artifacts, and structural image patterns were evaluated during detection.
  </li>

</ul>

        </div>

        <!-- DISCLAIMER -->
<div style="
  background:#F3F4F6;
  border-radius:10px;
  padding:9px;
">

  <div style="
    font-size:15px;
    font-weight:900;
    color:#000;
    margin-bottom:4px;
  ">
    DISCLAIMER
  </div>

  <div style="
    font-size:10px;
    color:#111827;
    line-height:1.5;
    font-weight:600;
  ">
    This report provides an automated AI based image analysis and should not be considered absolutely conclusive. Detection results may vary depending on image quality, compression, lighting conditions, edits, and model limitations.
  </div>

</div>
      </div>
    `;

    // =====================================================
    // APPEND
    // =====================================================
    document.body.appendChild(
      container
    );

    // =====================================================
    // WAIT FOR IMAGES
    // =====================================================
    const images =
      container.querySelectorAll("img");

    await Promise.all(

      Array.from(images).map((img) => {

        return new Promise((resolve) => {

          if (img.complete) {

            resolve();

          } else {

            img.onload = resolve;

            img.onerror = resolve;
          }
        });
      })
    );

    // =====================================================
    // HTML TO CANVAS
    // =====================================================
    const canvas =
      await html2canvas(container, {

        scale: 2,

        useCORS: true
      });

    const imgData =
      canvas.toDataURL("image/png");

    // =====================================================
    // PDF
    // =====================================================
    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const pdfWidth =
      pdf.internal
        .pageSize
        .getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      "ImageAnalysisReport.pdf"
    );

    // =====================================================
    // REMOVE CONTAINER
    // =====================================================
    document.body.removeChild(
      container
    );
  };

  return (

    <Button
      onClick={handleDownload}
      className="
        w-full
        mt-4
        bg-indigo-600
        hover:bg-indigo-700
        text-white
      "
    >
      Download PDF Report
    </Button>
  );
}