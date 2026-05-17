import { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';

export const useClientImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(1000);
  const [format, setFormat] = useState('auto');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string>('-');
  const [compressedSize, setCompressedSize] = useState<string>('-');
  const [reduction, setReduction] = useState<string>('-');
  const [dimensions, setDimensions] = useState<string>('-');
  const [originalFormat, setOriginalFormat] = useState<string>('-');

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
    setOriginalFile(file);
  };

  useEffect(() => {
    if (originalFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setDimensions(`${img.width} × ${img.height}px`);
          setWidth(Math.min(img.width, 1000));
          setPreviewUrl(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(originalFile);
      setOriginalSize(formatFileSize(originalFile.size));
      setOriginalFormat(originalFile.type.split('/')[1].toUpperCase());
    }
  }, [originalFile]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const compressImage = () => {
    if (!originalFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetWidth = width;
        const targetHeight = Math.round(targetWidth / aspectRatio);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setCompressedBlob(blob);
                setCompressedSize(formatFileSize(blob.size));
                const reductionValue =
                  ((originalFile.size - blob.size) / originalFile.size) * 100;
                setReduction(`${reductionValue.toFixed(1)}% smaller`);
                const reader = new FileReader();
                reader.onload = (e) => {
                  setPreviewUrl(e.target?.result as string);
                };
                reader.readAsDataURL(blob);
              }
            },
            `image/${format === 'auto' ? originalFile.type.split('/')[1] : format}`,
            quality / 100
          );
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(originalFile);
  };

  const downloadImage = () => {
    if (compressedBlob && originalFile) {
      const url = URL.createObjectURL(compressedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed-${originalFile.name.replace(
        /\.[^/.]+$/,
        ''
      )}.${compressedBlob.type.split('/')[1]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setCompressedBlob(null);
    setPreviewUrl(null);
    setOriginalSize('-');
    setCompressedSize('-');
    setReduction('-');
    setDimensions('-');
    setOriginalFormat('-');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return {
    originalFile,
    compressedBlob,
    quality,
    setQuality,
    width,
    setWidth,
    format,
    setFormat,
    previewUrl,
    originalSize,
    compressedSize,
    reduction,
    dimensions,
    originalFormat,
    fileInputRef,
    compressImage,
    downloadImage,
    reset,
    onFileChange,
    onDragOver,
    onDrop,
    handleFileSelect,
  };
};