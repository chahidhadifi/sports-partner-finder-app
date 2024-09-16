"use client";

import Link from "next/link";
import HeroImg from "../public/images/refer-a-friend.png";
import { signIn, useSession } from "next-auth/react";

export default function Hero({
  scrollToSection: propHero,
}: {
  scrollToSection: any;
}) {
  const { data: session } = useSession();

  return (
    <>
      <section className="bg-gray-100 text-gray-800">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none">
              Connect with Local Players,
              <span className="text-lime-600 ml-[3px]">Just Steps Away.</span>
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Uncover opportunities to join games and teams right in your
              neighborhood. SportsPartner connects you with nearby sports
              enthusiasts who share your passion.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <button
                rel="noopener noreferrer"
                className="px-8 py-3 text-lg font-semibold rounded bg-lime-600 text-gray-50"
                onClick={propHero}
              >
                Get Started
              </button>
              {!session ? (
                <Link
                  rel="noopener noreferrer"
                  href="/"
                  onClick={() => signIn("google")}
                  className="px-8 py-3 text-lg font-semibold border rounded border-gray-800"
                >
                  New Invitation
                </Link>
              ) : (
                <Link
                  rel="noopener noreferrer"
                  href="/new-invitation"
                  className="px-8 py-3 text-lg font-semibold border rounded border-gray-800"
                >
                  New Invitation
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={HeroImg.src}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
      <span id="#GetStarted"></span>
    </>
  );
}
