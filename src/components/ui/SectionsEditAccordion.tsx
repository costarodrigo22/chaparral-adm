import { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { Separator } from './separator';

interface SectionsEditAccordionProps {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
}

export default function SectionsEditAccordion({
  children,
  title,
  icon,
}: SectionsEditAccordionProps) {
  return (
    <section className="w-full flex items-center justify-center">
      <Accordion
        type="single"
        collapsible
        className="w-full dark:bg-black rounded-[10px]"
      >
        <AccordionItem
          value="item-1"
          className="border-none shadow-sections dark:shadow-sectionsDark rounded-[10px] px-7"
        >
          <AccordionTrigger className="">
            <div className="flex items-center gap-4">
              {icon && icon}
              {title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Separator className="bg-[#898989] dark:bg-[#898989] mb-[30px] mt-1" />
            <div className=" flex flex-col gap-8">{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
