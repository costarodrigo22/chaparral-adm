import { ImagePlus, Trash2 } from 'lucide-react';
import useFileUploader from './useFileUploader';
import { useEffect } from 'react';

interface FileUploaderProps {
  title: string;
  width: number;
  height: number;
  suggestedWidth: number;
  suggestedHeight: number;
  onFileSelect: (file: File | null, previewUrl: string | null) => void;
  endpoint?: string;
  actualImage?: string;
}

export default function FileUploader({
  title,
  width,
  actualImage,
  height,
  suggestedWidth,
  suggestedHeight,
  onFileSelect,
  endpoint,
}: FileUploaderProps) {
  const {
    handleFileChange,
    displayImage,
    setDisplayImage,
    handleDeleteImage,
    image,
    uniqueId,
  } = useFileUploader(endpoint, onFileSelect);

  useEffect(() => {
    setDisplayImage(image || actualImage || null);
  }, [actualImage, image, setDisplayImage]);

  return (
    <article className="flex flex-col gap-3">
      <h2 className="text-lg text-[#1e1e1e] dark:text-[#e1e1e1] font-semibold">
        {title}
      </h2>
      <div className="flex gap-4">
        <div
          className="relative border-dashed border border-black dark:border-white rounded-[5px]"
          style={{ height, width }}
        >
          <label
            className="w-full h-full cursor-pointer rounded-[5px] hover:opacity-80 transition-all duration-200 ease-in-out"
            htmlFor={`file-upload${uniqueId}`}
          >
            {displayImage ? (
              <img
                src={displayImage}
                alt="Preview"
                className="w-full h-full rounded-[5px]"
              />
            ) : (
              <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-[#efefef] dark:bg-[#393939] rounded-[5px]">
                <ImagePlus
                  data-testid="imageIcon"
                  size={25}
                  className="dark:text-[#eeeeee] text-[#898989]"
                />
                <span className="text-[#898989] dark:text-[#eeeeee] text-center text-xs font-medium">
                  Adicionar imagem
                </span>
              </div>
            )}
            <input
              id={`file-upload${uniqueId}`}
              data-testid="FileInput"
              accept="image/png, image/jpg, image/jpeg, image/svg+xml"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {displayImage && (
            <div
              onClick={() => handleDeleteImage()}
              className="cursor-pointer absolute top-1 right-1 w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10"
            >
              <Trash2 data-testid="trashIcon" color="red" size={19} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-end text-black dark:text-white">
          <h4 className="text-xs font-bold">Tamanho sugerido:</h4>
          <span className="text-[11px] font-semibold mt-3">
            Largura: {suggestedWidth} px
          </span>
          <span className="text-[11px] font-semibold">
            Altura: {suggestedHeight} px
          </span>
        </div>
      </div>
    </article>
  );
}
