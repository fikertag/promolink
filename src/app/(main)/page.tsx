"use client";

import JobLists from "@/components/JobLists";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden ">
      <div className="flex gap-10 mx-3 lg:mx-20 ">
        <JobLists />
        {/* <SideBar /> */}
      </div>
    </div>
  );
}
