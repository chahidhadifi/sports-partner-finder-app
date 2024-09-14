import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LearnMore from "./components/LearnMore";
import SearchByType from "./components/SearchType";

export default function page() {
  return (
    <>
      <Navbar currentPage="Home" />
      <Hero />
      <LearnMore />
      <SearchByType />
    </>
  );
}
