"use client";

import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import SportsList from "../data/SportsList";
import app from "@/lib/firebaseConfig";

export default function NewInvitation() {
  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [submitData, setSubmitData] = useState<SubmitData>({});

  interface SubmitData {
    [key: string]: any;
    userName?: string;
    email?: string;
    image?: string;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDoc(doc(db, "invitations", Date.now().toString()), submitData);
    router.push("/");
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setSubmitData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!session) router.push("/");
    setSubmitData((prevValues) => ({
      ...prevValues,
      userName: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
    }));
  }, []);
  return (
    <>
      <Navbar currentPage="" />
      <section className="p-6 bg-gray-100 text-gray-900">
        <form
          noValidate
          action=""
          className="container flex flex-col mx-auto space-y-12"
          onSubmit={handleSubmit}
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Create a New Sports Invitation</p>
              <p className="text-xs">
                Ready to organize a game? Use our simple form to create an
                invitation and let others in your area know you're looking to
                play.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="title" className="text-sm">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  name="title"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="sports" className="text-sm">
                  Sports / Games
                </label>
                <select
                  id="sports"
                  name="sport"
                  required
                  onChange={handleChange}
                  className="border border-gray-300 text-sm rounded-md focus:ring-lime-600 focus:ring-opacity-75 text-gray-900 focus:border-lime-600 block w-full p-2.5 "
                >
                  <option></option>
                  {SportsList?.map((value, index) => (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="date" className="text-sm">
                  Date
                </label>
                <input
                  id="date"
                  required
                  name="date"
                  type="date"
                  placeholder="Date"
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="time" className="text-sm">
                  Time
                </label>
                <input
                  id="time"
                  required
                  name="time"
                  type="time"
                  placeholder="Time"
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  City
                </label>
                <input
                  id="city"
                  required
                  name="city"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm">
                  State / Province
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="zip" className="text-sm">
                  ZIP / Postal
                </label>
                <input
                  id="zip"
                  required
                  name="zip"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder=""
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-lime-600 border-gray-300"
                ></textarea>
              </div>
              <div className="col-span-full">
                <button
                  rel="noopener noreferrer"
                  className="px-8 py-3 text-lg font-semibold rounded bg-lime-600 text-gray-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}
