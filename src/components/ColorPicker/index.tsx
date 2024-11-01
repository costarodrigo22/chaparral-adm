import { HexColorPicker } from 'react-colorful';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  title: string;
  actualVal: string;
}

export default function ColorPicker({
  onColorChange,
  title,
  actualVal,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(actualVal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    onColorChange(newColor);
  };

  return (
    <DropdownMenu>
      <div className="flex flex-col gap-2 cursor-pointer w-[120px]">
        <span className="text-black dark:text-white font-medium text-sm">
          {title}
        </span>
        <div className="py-1 pl-2 bg-[#D9D9D933] dark:bg-[#2c2929] flex items-center gap-[10px] rounded-[3px] w-full">
          <DropdownMenuTrigger asChild className="focus:outline-none ring-0">
            <div
              className="w-[12px] h-[12px] rounded-[1px] cursor-pointer"
              style={{ background: inputValue }}
            ></div>
          </DropdownMenuTrigger>
          <input
            type="text"
            className="bg-transparent w-[80%] text-[#898989] dark:text-white text-xs font-normal focus:outline-none"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={7}
            placeholder="#000000"
          />
        </div>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          <HexColorPicker
            className="w-5 h-5"
            color={inputValue}
            onChange={color => {
              setInputValue(color);
              onColorChange(color);
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
