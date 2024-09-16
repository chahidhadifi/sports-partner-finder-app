"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Navbar({ currentPage }: { currentPage: string }) {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <Link
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <p className="text-lime-600 text-xl dark:text-lime-400 logo">
              SportsPartner
            </p>
          </Link>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link
                rel="noopener noreferrer"
                href="/"
                className={
                  "flex items-center px-4 -mb-1 " +
                  (currentPage == "Home"
                    ? "border-b-2 border-solid text-lime-600  border-lime-600"
                    : "")
                }
              >
                Home
              </Link>
            </li>
            <li className="flex">
              <Link
                rel="noopener noreferrer"
                href="/about"
                className={
                  "flex items-center px-4 -mb-1 " +
                  (currentPage == "About"
                    ? "border-b-2 text-lime-600  border-lime-600"
                    : "")
                }
              >
                About
              </Link>
            </li>
            <li className="flex">
              <Link
                rel="noopener noreferrer"
                href="/contact"
                className={
                  "flex items-center px-4 -mb-1 " +
                  (currentPage == "Contact"
                    ? "border-b-2 text-lime-600  border-lime-600"
                    : "")
                }
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {!session ? (
              <button
                className="flex flex-row items-center self-center px-8 py-3 font-semibold rounded bg-lime-600 dark:bg-lime-400 text-gray-50 dark:text-gray-900"
                onClick={() => {
                  signIn("google");
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  className="h-6 w-6 mr-[8px]"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                Sign in
              </button>
            ) : (
              <div className="flex items-center">
                <div className="flex flex-row">
                  <img
                    className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                    src={session?.user?.image as string}
                    alt="avatar"
                  />
                  <div className="mx-1">
                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {session?.user?.name}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                <button
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-lg ml-3 font-semibold rounded bg-lime-600 text-gray-50"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <LogOut strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
          <div className="relative inline-block lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            {isOpen && (
              <div
                ref={dropdownRef}
                className={`absolute right-0 z-20 w-80 py-2 mt-2 origin-top-right bg-gray-50 rounded-md shadow-xl dark:bg-gray-800 transition-transform duration-100 ${
                  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                {!session ? (
                  <div>
                    <Link
                      href="/"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Contact
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <Link
                      href="/"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => signIn("google")}
                    >
                      Sign in
                    </Link>
                  </div>
                ) : (
                  <div>
                    <a
                      href="#"
                      className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <img
                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                        src={session?.user?.image as string}
                        alt="avatar"
                      />
                      <div className="mx-1">
                        <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {session?.user?.name}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {session?.user?.email}
                        </p>
                      </div>
                    </a>

                    <hr className="border-gray-200 dark:border-gray-700 "></hr>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      view profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Keyboard shortcuts
                    </a>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Company profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Team
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Invite colleagues
                    </a>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Help
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
