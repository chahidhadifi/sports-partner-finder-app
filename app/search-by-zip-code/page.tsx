"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Invitations from "../components/Invitations";

export default function SearchByZipCode() {
  const [searchValue, setSearchValue] = useState("");
  const [zipCode, setZipCode] = useState<string | null>(null);

  function handleSearchButton() {
    setZipCode(searchValue);
  }

  return (
    <>
      <Navbar currentPage="" />
      <section className="py-6 bg-gray-100 text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leading-none text-center">
            Find Players Near You
          </h1>
          <p className="text-xl font-medium text-center">
            Quickly connect with local sports enthusiasts by searching with your
            zip code or post code. Whether you're looking to join a game or find
            new teammates, entering your postal code helps you discover players
            and teams in your area.
          </p>
          <div className="flex flex-row pb-10">
            <input
              type="text"
              placeholder="Enter your zip code"
              className="w-4/5 p-3 rounded-l-lg sm:w-5/6"
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button
              type="button"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-lime-600 text-gray-50"
              onClick={handleSearchButton}
            >
              Search
            </button>
          </div>
        </div>
        <div className="px-20 md:px-30">
          <Invitations sportType={null} zipCode={zipCode} />
        </div>
      </section>
    </>
  );
}
