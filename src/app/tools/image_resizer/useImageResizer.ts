import { useState, useEffect, useRef } from 'react';

interface ImageResizerState {
  originalFile: File | null;
  resizedBlob: Blob | null;
  originalAspectRatio: number;
  previewUrl: string | null;
  originalSize: string;
  originalDimensions: string;
  newDimensions: string;
  format: string;
  width: number;
  height: number;
  aspectRatio: 'yes' | 'no';
  outputFormat: 'auto' | 'jpeg' | 'png' | 'webp';
  isResizing: boolean;
}

const useImageResizer = () => {
  const [state, setState] = useState<ImageResizerState>({
    originalFile: null,
    resizedBlob: null,
    originalAspectRatio: 1,
    previewUrl: null,
    originalSize: '-',
    originalDimensions: '-',
    newDimensions: '-',
    format: '-',
    width: 800,
    height: 600,
    aspectRatio: 'yes',
    outputFormat: 'auto',
    isResizing: false,
  });

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setState((prevState) => ({
          ...prevState,
          originalFile: file,
          originalSize: formatFileSize(file.size),
          format: file.type.split('/')[1].toUpperCase(),
          originalDimensions: `${img.width} × ${img.height}px`,
          originalAspectRatio: img.width / img.height,
          width: Math.round(img.width / 2),
          height: Math.round(img.height / 2),
          previewUrl: e.target?.result as string,
        }));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setState((prevState) => ({
      ...prevState,
      width: newWidth,
      height:
        prevState.aspectRatio === 'yes'
          ? Math.round(newWidth / prevState.originalAspectRatio)
          : prevState.height,
    }));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    setState((prevState) => ({
      ...prevState,
      height: newHeight,
      width:
        prevState.aspectRatio === 'yes'
          ? Math.round(newHeight * prevState.originalAspectRatio)
          : prevState.width,
    }));
  };

  const handleAspectRatioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      aspectRatio: e.target.value as 'yes' | 'no',
    }));
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      outputFormat: e.target.value as 'auto' | 'jpeg' | 'png' | 'webp',
    }));
  };

  const resizeImage = async () => {
    if (!state.originalFile) return;

    setState((prevState) => ({ ...prevState, isResizing: true }));

    const format =
      state.outputFormat === 'auto'
        ? state.originalFile.type.split('/')[1]
        : state.outputFormat;

    try {
      const blob = await resizeImageFile(
        state.originalFile,
        state.width,
        state.height,
        format
      );
      const reader = new FileReader();
      reader.onload = (e) => {
        setState((prevState) => ({
          ...prevState,
          resizedBlob: blob,
          newDimensions: `${prevState.width} × ${prevState.height}px`,
          previewUrl: e.target?.result as string,
          isResizing: false,
        }));
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Resizing error:', error);
      alert('Error resizing image. Please try again.');
      setState((prevState) => ({ ...prevState, isResizing: false }));
    }
  };

  const downloadImage = () => {
    if (!state.resizedBlob || !state.originalFile) return;

    const url = URL.createObjectURL(state.resizedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized-${state.originalFile.name.replace(
      /\.[^/.]+$/,
      ''
    )}.${state.resizedBlob.type.split('/')[1]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setState({
      originalFile: null,
      resizedBlob: null,
      originalAspectRatio: 1,
      previewUrl: null,
      originalSize: '-',
      originalDimensions: '-',
      newDimensions: '-',
      format: '-',
      width: 800,
      height: 600,
      aspectRatio: 'yes',
      outputFormat: 'auto',
      isResizing: false,
    });
  };

  return {
    ...state,
    fileInputRef,
    handleFileSelect,
    handleWidthChange,
    handleHeightChange,
    handleAspectRatioChange,
    handleFormatChange,
    resizeImage,
    downloadImage,
    reset,
  };
};

export default useImageResizer;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} bytes`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  else return `${(bytes / 1048576).toFixed(1)} MB`;
}

function resizeImageFile(
  file: File,
  targetWidth: number,
  targetHeight: number,
  format: string
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          let quality = 0.92;
          if (format === 'jpeg' || format === 'jpg') {
            quality = 0.92;
          } else if (format === 'webp') {
            quality = 0.9;
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas toBlob failed'));
                return;
              }
              resolve(blob);
            },
            `image/${format}`,
            quality
          );
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}