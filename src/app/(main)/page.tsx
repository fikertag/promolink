"use client";

import JobLists from "@/components/JobLists";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden ">
      <div className="grid lg:grid-cols-[8fr_3fr] grid-cols-1 gap-10 mx-3 lg:ml-20 ">
        <JobLists />
        <SideBar />
      </div>
    </div>
  );
}
