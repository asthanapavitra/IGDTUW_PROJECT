import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { useParams } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { fileId } = useParams(); // 👈 extract fileId from URL
  const [numPages, setNumPages] = useState(0);
  const canvasContainerRef = useRef();
  const pdfUrl = `${import.meta.env.VITE_BASE_URL}/faculty/get-file/${fileId}`; // 🔗 build full URL

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      setNumPages(pdf.numPages);
      const container = canvasContainerRef.current;
      container.innerHTML = ""; // clear existing canvases
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        pdf.getPage(pageNumber).then((page) => {
          const viewport = page.getViewport({ scale: 1.5 });
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
        });
      }
    });
  }, [pdfUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold ">📄 PDF Viewer</h2>
      <div ref={canvasContainerRef}></div>
    </div>
  );
};

export default PdfViewer;
