"use client";
import { useState, useEffect, useRef } from 'react';

declare const PDFLib: any;
declare const saveAs: any;

const usePdfCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalFileSize, setOriginalFileSize] = useState<number>(0);
  const [compressedPdfBytes, setCompressedPdfBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('-');
  const [originalSize, setOriginalSize] = useState<string>('-');
  const [pageCount, setPageCount] = useState<string>('-');
  const [compressedSize, setCompressedSize] = useState<string>('-');
  const [savings, setSavings] = useState<string>('-');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [compressionValue, setCompressionValue] = useState<number>(50);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.16.0/pdf-lib.min.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25MB limit');
      return;
    }

    setOriginalFile(file);
    setOriginalFileSize(file.size);
    setFileName(file.name);
    setOriginalSize(formatFileSize(file.size));

    try {
      const fileBytes = await readFileAsArrayBuffer(file);
      let pdfDoc;
      try {
        pdfDoc = await PDFLib.PDFDocument.load(fileBytes);
      } catch(e: any) {
        if (e.message && e.message.toLowerCase().includes('encrypted')) {
            alert('Protocol Error: The document is encrypted. Please unlock the file before compressing.');
            return;
        }
        throw e;
      }
      setPageCount(pdfDoc.getPageCount());

      setShowPreview(true);
      setShowResult(false);
      setShowDownload(false);
    } catch (error) {
      alert('Error loading PDF file. Please try again.');
      console.error('PDF loading error:', error);
    }
  };

  const compressPdfWithPercentage = async (
    fileBytes: ArrayBuffer,
    targetReduction: number,
    method: string
  ): Promise<Uint8Array> => {
    let pdfDoc;
    try {
        pdfDoc = await PDFLib.PDFDocument.load(fileBytes);
    } catch (e: any) {
        if (e.message && e.message.toLowerCase().includes('encrypted')) {
            alert('Protocol Error: The document is encrypted. Please unlock the file before compressing.');
            throw e;
        }
        throw e;
    }
    let originalSize = fileBytes.byteLength;

    let compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      useCompression: true,
    });

    let currentReduction = 1 - compressedBytes.byteLength / originalSize;
    if (currentReduction >= targetReduction / 100) {
      return compressedBytes;
    }

    if (method === 'aggressive') {
      pdfDoc = await PDFLib.PDFDocument.load(compressedBytes);
      let pages = pdfDoc.getPages();

      pages.forEach((page: any) => {
        const currentSize = page.getFontSize();
        if (currentSize > 8) {
          page.setFontSize(Math.max(8, currentSize * 0.85));
        }
      });

      compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        useCompression: true,
      });

      currentReduction = 1 - compressedBytes.byteLength / originalSize;
      if (currentReduction >= targetReduction / 100) {
        return compressedBytes;
      }

      if (targetReduction >= 60) {
        pdfDoc = await PDFLib.PDFDocument.load(compressedBytes);
        pages = pdfDoc.getPages();

        pages.forEach((page: any) => {
          if (targetReduction >= 70) {
            const currentSize = page.getFontSize();
            if (currentSize > 6) {
              page.setFontSize(Math.max(6, currentSize * 0.8));
            }
          }
        });

        compressedBytes = await pdfDoc.save({
          useObjectStreams: true,
          useCompression: true,
        });
      }
    }

    return compressedBytes;
  };

  const handleCompress = async () => {
    if (!originalFile) return;

    setIsCompressing(true);

    try {
      const fileBytes = await readFileAsArrayBuffer(originalFile);
      const method = (document.getElementById('compression-method') as HTMLSelectElement).value;

      const compressedBytes = await compressPdfWithPercentage(
        fileBytes,
        compressionValue,
        method
      );

      setCompressedPdfBytes(compressedBytes);
      const compressedSizeValue = compressedBytes.byteLength;
      const savingsValue = (
        ((originalFileSize - compressedSizeValue) / originalFileSize) *
        100
      ).toFixed(1);

      setCompressedSize(formatFileSize(compressedSizeValue));
      setSavings(`${savingsValue}% smaller`);

      setShowResult(true);
      setShowDownload(true);

      if (compressionValue > 60 && parseFloat(savingsValue) < compressionValue * 0.9) {
        alert(
          "Note: This PDF couldn't be compressed as much as requested without significant quality loss. Try the 'Aggressive' mode for better results."
        );
      }
    } catch (error) {
      alert('Error compressing PDF. Please try a lower compression setting.');
      console.error('Compression error:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedPdfBytes || !originalFile) return;

    const originalName = originalFile.name.replace('.pdf', '');
    const newFilename = `${originalName}-compressed.pdf`;

    const blob = new Blob([compressedPdfBytes as any], {
      type: 'application/pdf',
    });
    saveAs(blob, newFilename);
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setOriginalFile(null);
    setOriginalFileSize(0);
    setCompressedPdfBytes(null);
    setFileName('-');
    setOriginalSize('-');
    setPageCount('-');
    setCompressedSize('-');
    setSavings('-');
    setShowPreview(false);
    setShowResult(false);
    setShowDownload(false);
    setCompressionValue(50);
  };

  return {
    originalFile,
    fileName,
    originalSize,
    pageCount,
    compressedSize,
    savings,
    isCompressing,
    showPreview,
    showResult,
    showDownload,
    compressionValue,
    fileInputRef,
    handleFileSelect,
    handleCompress,
    handleDownload,
    handleReset,
    setCompressionValue,
  };
};

export default usePdfCompressor;