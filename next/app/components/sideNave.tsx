import { ScrollArea } from "@mantine/core";
import Link from "next/link";
import React from "react";

const SideNave = () => {
  return (
    <div className=" flex flex-row justify-start pl-8 text-[#339af0] ">
      <ScrollArea h={600}>
       <Link href='/department' className=" ">  Department </Link>
      </ScrollArea>
    </div>
  );
};

export default SideNave;
