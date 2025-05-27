import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { useParams } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { fileId } = useParams();
  const [numPages, setNumPages] = useState(0);
  const canvasContainerRef = useRef();
  const previousWidthRef = useRef(0);
  const pdfUrl = `${import.meta.env.VITE_BASE_URL}/faculty/get-file/${fileId}`;

  // Debounce function to limit frequency
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const renderPDF = async () => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const currentWidth = container.clientWidth;

    // Only re-render if width has changed significantly (e.g., screen rotation)
    if (Math.abs(previousWidthRef.current - currentWidth) < 10) return;

    previousWidthRef.current = currentWidth;
    container.innerHTML = "";

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    setNumPages(pdf.numPages);

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = currentWidth / unscaledViewport.width;

      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      container.appendChild(canvas);

      await page.render({ canvasContext: context, viewport }).promise;
    }
  };

  useEffect(() => {
    renderPDF();

    const handleResize = debounce(() => {
      renderPDF();
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pdfUrl]);

  return (
    <div className="min-h-screen w-full max-w-[1000px] mx-auto p-4">
      <div ref={canvasContainerRef} className="w-full"></div>
    </div>
  );
};

export default PdfViewer;
