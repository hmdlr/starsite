import React, { useEffect, useRef } from 'react';

interface ImageWithContrastProps {
  src: string;
  contrast?: number;
  brightness?: number;
}

export const ImageWithContrast: React.FC<ImageWithContrastProps> = ({
                                                               src,
                                                               contrast = 1.5,
                                                               brightness = 50,
                                                             }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; // This is required if the image is hosted on another domain
    img.src = src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Apply contrast
        for (let j = 0; j < 3; j++) {
          data[i + j] = ((data[i + j] - 128) * contrast) + 128;
        }

        // Apply brightness
        for (let j = 0; j < 3; j++) {
          data[i + j] += brightness;
        }
      }

      context.putImageData(imageData, 0, 0);
    };
  }, [src, contrast, brightness]);

  return <canvas ref={canvasRef} />;
};
