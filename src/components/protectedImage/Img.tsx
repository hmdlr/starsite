import { useEffect, useState } from 'react';
import { useStorage } from '../../hooks/useStorage';

/**
 * This component is used to fetch images from the backend.
 * It uses the token from the storage to fetch the image.
 * @param props
 * @constructor
 */
export const Img = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  const { token } = useStorage();
  const { src, ...rest } = props;
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!token || !src) {
      return;
    }

    const fetchImage = async () => {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      const req = new Request(src, {
        method: 'GET',
        headers,
        mode: 'cors',
      });

      try {
        const res = await fetch(req);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        setUrl(blobUrl as any);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [token, src]);

  return <img src={url!} {...rest} />;
};
