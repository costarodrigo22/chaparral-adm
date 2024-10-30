import { cn } from '@/lib/utils';
import useInputTypeWYSIWYG from './useInputTypeWYSIWYG';
import { Edit } from 'lucide-react';

interface InputTypeWYSIWYGProps {
  title: string;
  onIsEditable: () => void;
  isEditable: boolean;
  actualValue: string;
  onContentChange: (content: string) => void;
}

export default function InputTypeWYSIWYG({
  title,
  actualValue,
  onContentChange,
  onIsEditable,
  isEditable,
}: InputTypeWYSIWYGProps) {
  const { quillRef } = useInputTypeWYSIWYG({
    onContentChange,
    initialValue: actualValue,
  });

  return (
    <div className="container flex flex-col gap-3">
      <span className="text-lg font-medium text-black dark:text-white">
        {title}
      </span>
      <div className={cn(' ', isEditable ? '' : 'pointer-events-none')}>
        <div ref={quillRef} />
      </div>
      <div className="w-full flex items-center justify-end">
        {!isEditable ? (
          <button
            onClick={onIsEditable}
            className="mt-2 bg-[#f1f5f9] items-center justify-center hover:bg-opacity-70 transition-all duration-200 dark:hover:bg-opacity-80 hover:border-opacity-70 border border-[#e2e8f0] flex gap-[10px] text-white py-1 px-4 rounded-lg"
          >
            <Edit className="text-[#1e1e1e]" size={18} />
            <span className="text-[#1e1e1e]">Editar</span>
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
