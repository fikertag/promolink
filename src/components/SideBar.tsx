import { Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SideBar() {
  return (
    <div className=" flex flex-col  items-center pt-7">
      <p className="flex justify-start w-[250px] text-xl mb-10">
        Welcome Fikir
      </p>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-[250px] border h-fit px-5 rounded-sm bg-gray-100"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-bold ">
            Your Profile
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center mb-5">
              <span>Edit your profile</span>
              <Pencil size={16} />
            </div>{" "}
            <Progress value={60} className="text-black fill-black" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-[250px] border h-fit mt-6 px-5 rounded-sm bg-gray-100"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-bold ">
            Propozal and offers
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center mb-5 ">
              <span className="">Contract offres</span>{" "}
              <span className="text-gray-600">0</span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="">Invites to apply</span>
              <span className="text-gray-600">0</span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="">Proposals</span>
              <span className="text-gray-600">0</span>
            </div>
            <div className="underline text-primary">View All</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-6 flex w-[250px] border h-fit  px-5 rounded-sm bg-gray-100 justify-start py-3 text-sm underline text-primary">
        Help center
      </div>
    </div>
  );
}
