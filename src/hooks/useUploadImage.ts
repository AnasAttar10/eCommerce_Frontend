import { useState } from 'react';
type UploadedImage = {
  url: string;
  name: string;
};
const useUploadImage = () => {
  const [image, setImage] = useState<UploadedImage | undefined>(undefined);
  const [images, setImages] = useState<UploadedImage[] | undefined>([]);

  const onImageChange = (selectedFiles: (string | File)[] | File | string) => {
    if (Array.isArray(selectedFiles)) {
      if (selectedFiles.length > 0) {
        const uploadedImages = (selectedFiles as File[]).map((f, idx) => {
          if (f instanceof File)
            return { url: URL.createObjectURL(f), name: f.name };
          else return { url: f, name: `image${idx}` };
        });
        setImages(uploadedImages);
      } else {
        setImages([]);
      }
    } else if (selectedFiles instanceof File) {
      setImage({
        url: URL.createObjectURL(selectedFiles),
        name: selectedFiles.name,
      });
    }
  };
  const resetImage = () => {
    setImage(undefined);
    setImages([]);
  };

  return {
    image,
    images,
    setImage,
    setImages,
    onImageChange,
    resetImage,
  };
};

export default useUploadImage;
