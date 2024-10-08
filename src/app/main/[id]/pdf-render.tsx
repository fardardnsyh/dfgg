"use client"


import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Donut, FileText } from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs} from "react-pdf"
import { useResizeDetector } from "react-resize-detector";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set the workerSrc to a CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



interface PdfRenderPageProps {
  pdfUrl: string;
}

const PdfRenderPage = ({ pdfUrl }: PdfRenderPageProps) => {
  const [numPages, setNumPages] = useState<number>();

  const { width, ref } = useResizeDetector();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const PdfLoading = () => {
    return (
      <div className='flex flex-col gap-y-2 justify-center items-center h-[calc(100dvh-7rem)] max-h-[calc(100dvh-7rem)]
                      w-full text-zinc-50'>
        <Donut className='w-5 h-5 animate-spin font-light' />
        <p>{"Please wait while I fetch your file ✌🏻"}</p>
      </div>
    );
  };

  const PageLoading = () => {
    return (
      <div className='flex flex-col gap-y-2 justify-center items-center h-[calc(100dvh-7rem)] max-h-[calc(100dvh-7rem)]
                      w-full text-zinc-50'>
        <FileText className='w-10 h-10 animate-spin font-light text-zinc-400' />
      </div>
    );
  };

  return (
    <div ref={ref} className='hidden md:flex md:flex-1/2 justify-center items-center
                              w-full border border-zinc-700 rounded-md shadow-md bg-zinc-800'>
      <div className='overflow-auto overflow-x-hidden h-[calc(100dvh-7rem)] max-h-[calc(100dvh-7rem)] pt-4 pb-2'>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={PdfLoading}>
          {Array.from(new Array(numPages)).map((_, n) => (
            <Page
              key={n}
              loading={PageLoading}
              pageNumber={n + 1}
              width={width ? width * 0.95 : 100}
              className="mb-2"
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfRenderPage;
