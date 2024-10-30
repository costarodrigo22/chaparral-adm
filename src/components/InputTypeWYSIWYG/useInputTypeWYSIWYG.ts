import { useEffect, useCallback } from "react";
import 'quill/dist/quill.snow.css';
import { useQuill } from "react-quilljs";

interface UseInputTypeWYSIWYGProps {
  onContentChange: (content: string) => void;
  initialValue?: string;
}

export default function useInputTypeWYSIWYG({ onContentChange, initialValue = '' }: UseInputTypeWYSIWYGProps) {

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        [
          { color: [
              '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff',
              '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666',
              '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00',
              '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600',
              '#003700', '#002966', '#3d1466', '#e7e7e7', '#d0d0d0', '#b0b0b0', '#909090', '#707070',
              '#DB0084', '#FBA301', '#898989', '#1E1E1E', '#FC4CD1', '#5E14FF', '#2B0036', '#00DB99',
              '#FFEFE9', '#FDECE5', '#5C006F', '#36133D', '#02EA11',
            ]
          },
        ],
      ],
    },
  });

  const setQuillContent = useCallback(() => {
    if (quill && initialValue !== quill.root.innerHTML) {
      quill.root.innerHTML = initialValue;
    }
  }, [quill, initialValue]);

  useEffect(() => {
    setQuillContent();
  }, [setQuillContent]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onContentChange(content);
      });
    }
  }, [quill, onContentChange]);

  return { quillRef };
}
