"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LearnMore from "./components/LearnMore";
import SearchByType from "./components/SearchType";

import { useRef } from "react";

export default function page() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Navbar currentPage="Home" />
      <Hero scrollToSection={scrollToSection} />
      <LearnMore />
      <SearchByType sectionRef={sectionRef} />
    </>
  );
}
