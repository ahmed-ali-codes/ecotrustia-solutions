import { useState, useRef } from 'react';

export const useImageCompressor = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState({
    originalSize: '-',
    compressedSize: '-',
    savings: '-',
    isLarger: false,
  });
  const [isCompressing, setIsCompressing] = useState(false);
  const [outputFormat, setOutputFormat] = useState('auto');
  const [quality, setQuality] = useState(80);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file (JPG, PNG, WEBP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit');
      return;
    }

    setCurrentFile(file);
    setOriginalFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      const format = file.name.split('.').pop()?.toLowerCase();
      if (format === 'jpg' || format === 'jpeg' || format === 'png' || format === 'webp') {
        setOutputFormat(format === 'jpeg' ? 'jpg' : format);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!currentFile) return;

    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        let format = outputFormat;
        if (format === 'auto') {
          const ext = currentFile.name.split('.').pop()?.toLowerCase();
          format = ext === 'jpeg' ? 'jpg' : ext || 'jpg';
        }

        let mimeType;
        switch (format) {
          case 'jpg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'webp':
            mimeType = 'image/webp';
            break;
          default:
            mimeType = 'image/jpeg';
        }

        const compressionQuality = quality / 100;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              let finalBlob: Blob = blob;
              let finalSize = blob.size;
              let savingsText = '';

              let isLarger = false;

              // If the newly encoded blob is larger than the original AND it's the same format,
              // we keep the original file because it's already better optimized than what the browser can do.
              const isSameFormat = currentFile.type === mimeType;
              if (blob.size >= originalFileSize && isSameFormat) {
                finalBlob = currentFile;
                finalSize = originalFileSize;
                savingsText = 'Already Optimized (0%)';
              } else {
                const savings = (((originalFileSize - finalSize) / originalFileSize) * 100).toFixed(1);
                // If it still got larger (e.g., converting to a less efficient format), show a size increase warning
                if (finalSize > originalFileSize) {
                   savingsText = `+${Math.abs(Number(savings))}% larger`;
                   isLarger = true;
                } else {
                   savingsText = `${savings}% smaller`;
                }
              }

              setCompressedBlob(finalBlob);
              setCompressionInfo({
                originalSize: formatFileSize(originalFileSize),
                compressedSize: formatFileSize(finalSize),
                savings: savingsText,
                isLarger: isLarger,
              });
            }
            setIsCompressing(false);
          },
          mimeType,
          compressionQuality
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(currentFile);
  };

  const handleDownload = () => {
    if (!compressedBlob || !currentFile) return;

    const originalName = currentFile.name.split('.').shift();
    let extension;
    switch (outputFormat) {
      case 'jpg':
        extension = 'jpg';
        break;
      case 'png':
        extension = 'png';
        break;
      case 'webp':
        extension = 'webp';
        break;
      default:
        extension = currentFile.name.split('.').pop();
    }
    const newFilename = `${originalName}-compressed.${extension}`;

    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = newFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setCurrentFile(null);
    setOriginalFileSize(0);
    setCompressedBlob(null);
    setPreviewUrl(null);
    setCompressionInfo({
      originalSize: '-',
      compressedSize: '-',
      savings: '-',
      isLarger: false,
    });
    setOutputFormat('auto');
    setQuality(80);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return {
    currentFile,
    previewUrl,
    compressionInfo,
    isCompressing,
    outputFormat,
    quality,
    fileInputRef,
    handleFileSelect,
    handleCompress,
    handleDownload,
    handleReset,
    setOutputFormat,
    setQuality,
    compressedBlob,
  };
};