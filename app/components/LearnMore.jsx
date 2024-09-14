"use client";

import Link from "next/link";

export default function LearnMore() {
  return (
    <>
      <section className="py-6 bg-lime-600 text-gray-50">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leading-none text-center">
            What Can You Do?
          </h1>
          <ul className="ml-4 space-y-1 list-disc pt-2 pb-6 text-xl font-medium">
            <li>
              Find and connect with players in your area by entering your postal
              code. Discover nearby sports enthusiasts who are eager to join a
              game.
            </li>
            <li>
              Looking for someone to play with? Create a post detailing your
              sport and availability, and let others in your area reach out to
              you.
            </li>
            <li>
              Explore local sports activities and teams by searching for
              specific games or sports you’re interested in.
            </li>
          </ul>
          <button className="px-8 py-3 text-lg font-semibold rounded bg-gray-100 text-gray-900">
            <Link href="/about">Learn more</Link>
          </button>
        </div>
      </section>
    </>
  );
}
