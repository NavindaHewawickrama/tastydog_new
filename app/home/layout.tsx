"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "./footer/page";
import React, { useState,useEffect } from "react";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

const [isDesktop, setIsDesktop] = useState(true);

//checking if window is desktop size or not
const checkWindowSize = () => {
  let windowWidth;
  if(typeof window !== "undefined") {
    windowWidth = window.innerWidth;
    console.log(windowWidth);
    if( windowWidth >= 1024){
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }

  
}

useEffect(() => {
  checkWindowSize();
}, [isDesktop])


//when window is resizing
  if(typeof window !== "undefined") {
    window.addEventListener('resize', checkWindowSize);
  }

  return (
    <>
    { isDesktop ? (
      <div className="w-full min-h-screen flex">
      <div className="w-[15%]">
        <Sidebar />
      </div>

      <div className="w-[85%] flex flex-col">
        <Navbar />

        <main className="flex-grow md:pl-[50px] lg:pl-0">{children}</main>

        <Footer />
      </div>
    </div>
    ):(
      <div className="w-full min-h-screen flex">
      <div >
        <Sidebar />
      </div>

      <div className="w-[100%] flex flex-col">
        <Navbar />

        <main className="flex-grow md:pl-[50px] lg:pl-0">{children}</main>

        <Footer/>
      </div>
    </div>
    )}
    </>
  );
}