"use client";
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

// Set up the worker for PDF.js to parse the PDF files correctly (v5+ uses .mjs).
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_WIDTH = 800;
const PAGE_HEIGHT = 450; // High-Res 16:9 Base size

const PageContent = React.forwardRef<HTMLDivElement, { pageNumber: number }>((props, ref) => {
  return (
    <div className="page" ref={ref}>
       <div className="page-content w-full h-full bg-white flex items-center justify-center overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
        <Page 
          pageNumber={props.pageNumber} 
          className="responsive-pdf-page w-full h-full flex items-center justify-center bg-white"
          renderTextLayer={false} 
          renderAnnotationLayer={false} 
        />
       </div>
    </div>
  );
});

PageContent.displayName = 'PageContent';

export default function FlipbookSection({ pdfUrl, title }: { pdfUrl: string, title: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-start pt-10 pb-16 px-4 w-full">
      <h3 className="text-2xl lg:text-3xl font-black mb-6 text-white text-gradient tracking-tight text-center z-20 relative">{title}</h3>
      <div className="h-4 w-full"></div>
      <div className="flex justify-center items-center p-4 md:p-6 glass-card rounded-2xl border border-white/10 w-full relative z-10 transition-all hover:border-primary/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-gradient-to-br from-white/5 to-transparent">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={(
            <div className="flex items-center justify-center py-32 px-10 min-h-[300px] w-full">
              <i className="fas fa-circle-notch fa-spin text-4xl text-primary mb-4 block"></i>
            </div>
          )}
        >
           {numPages > 0 ? (
            // @ts-ignore
            <HTMLFlipBook 
              width={PAGE_WIDTH} 
              height={PAGE_HEIGHT} 
              size="stretch"
              minWidth={280}
              maxWidth={800}
              minHeight={157}
              maxHeight={450}
              showCover={false}
              mobileScrollSupport={true}
              className="flipbook-wrapper shadow-2xl drop-shadow-[0_0_40px_rgba(139,92,246,0.2)]"
            >
              {[...Array(numPages)].map((_, i) => (
                <PageContent key={i} pageNumber={i + 1} />
              ))}
            </HTMLFlipBook>
          ) : null}
        </Document>
      </div>
      <p className="text-muted/50 text-[10px] mt-8 uppercase tracking-widest font-mono text-center relative z-20">Drag corners to flip presentation</p>
      
      <style jsx global>{`
        .responsive-pdf-page canvas {
           max-width: 100% !important;
           max-height: 100% !important;
           width: 100% !important;
           height: 100% !important;
           object-fit: contain !important;
        }
      `}</style>
    </div>
  );
}
