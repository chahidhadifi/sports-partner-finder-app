"use client";

import { Bike } from "lucide-react";
import { MapPinned } from "lucide-react";

import Link from "next/link";
import { LegacyRef } from "react";

export default function SearchByType({
  sectionRef: propSearch,
}: {
  sectionRef: LegacyRef<HTMLDivElement> | undefined;
}) {
  return (
    <>
      <section>
        <div className="py-3 bg-gray-100 text-gray-800" ref={propSearch}>
          <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-45 md:py-32 md:px-10 lg:px-32 text-gray-900">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-800">
              Choose Your Search Method
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-800">
              Select how you'd like to find local sports opportunities. Whether
              you want to connect with players in your area by entering your zip
              code or explore activities based on your favorite sports, we've
              got you covered. Choose an option below to get started.
            </p>
            <div className="flex flex-wrap justify-center">
              <Link href="/search-by-zip-code">
                {" "}
                <button
                  type="button"
                  className="px-8 py-3 m-2 text-lg font-semibold rounded bg-lime-600 text-gray-50 flex flex-row items-center"
                >
                  <Bike className="mr-3" size={24} strokeWidth={2} />
                  Search by Zip Code
                </button>
              </Link>
              <Link href="/search-by-sport">
                {" "}
                <button
                  type="button"
                  className="px-8 py-3 m-2 text-lg font-semibold rounded bg-lime-600 text-gray-50 flex flex-row items-center"
                >
                  <MapPinned className="mr-3" size={24} strokeWidth={2} />
                  Search by Sport Type
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
