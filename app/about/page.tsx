"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar currentPage="" />
      <section className="py-6 bg-lime-600 text-gray-50">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leading-none text-center">
            About Us
          </h1>
          <p className="text-xl text-center font-medium pt-2 pb-6">
            At SportsPartner, we believe that sports bring people together. Our
            mission is to connect local players and enthusiasts, helping you
            find opportunities to play, team up, and make lasting connections in
            your community.
          </p>
          <ul className="ml-4 space-y-1 list-disc pt-2 pb-6 text-xl font-medium">
            <li>
              Discover games and teams in your neighborhood by simply entering
              your postal code.
            </li>
            <li>
              Share your availability and interests to let others know you’re
              ready to play.
            </li>
            <li>
              Explore various sports activities and join teams that align with
              your passion.
            </li>
          </ul>
          <p className="text-xl text-center font-medium pt-2 pb-6">
            Whether you’re looking to meet new friends, stay active, or dive
            into competitive play, SportsPartner is here to make it easy and
            fun.
          </p>
        </div>
      </section>
    </>
  );
}
