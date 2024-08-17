"use client";

import React, { useState, useEffect } from 'react';
import PdfRenderPage from './pdf-render';

const FileViewer: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const response = await fetch('/api/getUrl');
        const data = await response.json();
        setPdfUrl(data.pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF URL:', error);
      }
    };

    fetchPdfUrl();
  }, []);

  const zoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const zoomOut = () => {
    setZoom((prevZoom) => (prevZoom > 0.2 ? prevZoom - 0.1 : prevZoom));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="flex flex-col w-full px-4 bg-zinc-800 rounded-md">
      {pdfUrl ? (
        <PdfRenderPage pdfUrl={pdfUrl} />
      ) : (
        <p>Loading PDF...</p>
      )}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <button onClick={resetZoom}>Reset Zoom</button>
      </div>
    </div>
  );
};

export default FileViewer;
