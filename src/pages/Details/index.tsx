import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import InputTypeWYSIWYG from '@/components/InputTypeWYSIWYG';
import SectionsEditAccordion from '@/components/ui/SectionsEditAccordion';
import { Button } from '@/components/ui/Button';

export default function Details() {
  const [fileDetails, setFileDetails] = useState<{
    [key: string]: { file: File | null; previewUrl: string | null };
  }>({});

  const handleFileSelect = (
    key: string,
    file: File | null,
    previewUrl: string | null,
  ) => {
    setFileDetails(prevState => ({
      ...prevState,
      [key]: { file, previewUrl },
    }));
  };

  function handleSeeImages() {
    console.log(fileDetails);
  }

  return (
    <div className="flex flex-col gap-5 px-10 my-14">
      <SectionsEditAccordion title="Sobre">
        <FileUploader
          height={130}
          width={130}
          suggestedHeight={100}
          suggestedWidth={60}
          title="Imagem"
          onFileSelect={(file, previewUrl) =>
            handleFileSelect('sobre', file, previewUrl)
          }
        />
        <InputTypeWYSIWYG title="Título" />
        <InputTypeWYSIWYG title="Descrição" />
      </SectionsEditAccordion>

      <SectionsEditAccordion title="Responsabilidade com a sutentabilidade">
        <FileUploader
          height={130}
          width={130}
          suggestedHeight={80}
          suggestedWidth={45}
          title="Imagem"
          onFileSelect={(file, previewUrl) =>
            handleFileSelect('sustentabilidade', file, previewUrl)
          }
        />
        <InputTypeWYSIWYG title="Título" />
        <InputTypeWYSIWYG title="Descrição" />
      </SectionsEditAccordion>

      <SectionsEditAccordion title="Nossa missão e valores">
        <FileUploader
          height={130}
          width={130}
          suggestedHeight={65}
          suggestedWidth={65}
          title="Imagem"
          onFileSelect={(file, previewUrl) =>
            handleFileSelect('missao', file, previewUrl)
          }
        />
        <InputTypeWYSIWYG title="Título" />
        <InputTypeWYSIWYG title="Descrição" />
        <Button onClick={handleSeeImages} />
      </SectionsEditAccordion>
    </div>
  );
}
