import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { useParams } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { fileId } = useParams();
  const [numPages, setNumPages] = useState(0);
  const canvasContainerRef = useRef();
  const pdfUrl = `${import.meta.env.VITE_BASE_URL}/faculty/get-file/${fileId}`;

  useEffect(() => {
    const renderPDF = async () => {
      const container = canvasContainerRef.current;
      if (!container) return;

      container.innerHTML = ""; // Clear old canvases

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);

      const containerWidth = container.clientWidth;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / unscaledViewport.width;

        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        container.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      }
    };

    renderPDF();
    window.addEventListener("resize", renderPDF); // re-render on resize

    return () => {
      window.removeEventListener("resize", renderPDF);
    };
  }, [pdfUrl]);

  return (
    <div className="min-h-screen w-full max-w-[1000px] mx-auto p-4">
      <div ref={canvasContainerRef} className="w-full"></div>
    </div>
  );
};

export default PdfViewer;

