import { ReactNode } from 'react';
import { Separator } from './separator';

interface SectionsEditWrapperProps {
  title: string;
  children: ReactNode;
}

export default function SectionsEditWrapper({
  children,
  title,
}: SectionsEditWrapperProps) {
  return (
    <section className="w-full flex items-center justify-center pb-10">
      <div className=" container w-[95%] flex  pb-[30px] flex-col pt-10 px-[30px] h-auto mt-10 rounded-[10px] shadow-sections dark:shadow-sectionsDark bg-white dark:bg-black">
        <h2 className="font-semibold text-black dark:text-white text-lg mb-5">
          {title}
        </h2>
        <Separator className="bg-[#898989] dark:bg-[#898989] mb-[30px]" />
        {children}
      </div>
    </section>
  );
}
