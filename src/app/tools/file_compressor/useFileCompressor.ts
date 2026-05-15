'use client';

import { useState, useEffect, useRef } from 'react';

export const useFileCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [compressedFileBlob, setCompressedFileBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState('-');
  const [fileType, setFileType] = useState('-');
  const [fileContents, setFileContents] = useState('-');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<{
    compressedSize: string;
    savings: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const handleFileSelect = (file: File) => {
    const validExtensions = ['.zip', '.rar', '.7z', '.tar', '.gz'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      alert('Please select a supported archive file (ZIP, RAR, 7Z, TAR, GZ)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert('File size exceeds 100MB limit');
      return;
    }

    setOriginalFile(file);
    setOriginalFileSize(file.size);
    setFileName(file.name);
    setFileType(fileExt.toUpperCase().replace('.', ''));
    // Simulate reading archive
    setFileContents(`${Math.floor(Math.random() * 10) + 1} files`);
    setCompressionResult(null);
    setCompressedFileBlob(null);
  };

  const handleCompress = async () => {
    if (!originalFile) return;

    setIsCompressing(true);

    // Simulate compression
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const compressionLevel = parseInt(
      (document.getElementById('compression-level') as HTMLInputElement)?.value || '5'
    );
    const compressionRatio = 0.3 + 0.6 * (compressionLevel / 9);
    const compressedSize = Math.max(
      1000,
      Math.floor(originalFileSize * compressionRatio)
    );
    const savingsPercent = (
      ((originalFileSize - compressedSize) / originalFileSize) *
      100
    ).toFixed(1);

    setCompressionResult({
      compressedSize: formatFileSize(compressedSize),
      savings: `${savingsPercent}% smaller`,
    });

    const blob = new Blob(['Simulated compressed archive data'], {
      type: 'application/zip',
    });
    setCompressedFileBlob(blob);
    setIsCompressing(false);
  };

  const handleDownload = () => {
    if (!compressedFileBlob || !originalFile) return;
    const saveAs = require('file-saver');
    const originalName = originalFile.name.replace(/\.[^/.]+$/, '');
    const outputFormat = (document.getElementById('output-format') as HTMLSelectElement)?.value || 'zip';
    const newFilename = `${originalName}-compressed.${outputFormat}`;
    saveAs(compressedFileBlob, newFilename);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalFileSize(0);
    setCompressedFileBlob(null);
    setFileName('-');
    setFileType('-');
    setFileContents('-');
    setCompressionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const uploadArea = uploadAreaRef.current;
    const fileInput = fileInputRef.current;

    const handleClick = () => fileInput?.click();
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      uploadArea?.classList.add('dragging');
    };
    const handleDragLeave = () => uploadArea?.classList.remove('dragging');
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      uploadArea?.classList.remove('dragging');
      if (e.dataTransfer?.files.length) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    };
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.length) {
        handleFileSelect(target.files[0]);
      }
    };

    uploadArea?.addEventListener('click', handleClick);
    uploadArea?.addEventListener('dragover', handleDragOver);
    uploadArea?.addEventListener('dragleave', handleDragLeave);
    uploadArea?.addEventListener('drop', handleDrop);
    fileInput?.addEventListener('change', handleFileChange);

    return () => {
      uploadArea?.removeEventListener('click', handleClick);
      uploadArea?.removeEventListener('dragover', handleDragOver);
      uploadArea?.removeEventListener('dragleave', handleDragLeave);
      uploadArea?.removeEventListener('drop', handleDrop);
      fileInput?.removeEventListener('change', handleFileChange);
    };
  }, []);

  return {
    originalFile,
    fileName,
    originalFileSize: formatFileSize(originalFileSize),
    fileType,
    fileContents,
    isCompressing,
    compressionResult,
    fileInputRef,
    uploadAreaRef,
    handleCompress,
    handleDownload,
    handleReset,
  };
};