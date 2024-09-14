"use client";

import Navbar from "../components/Navbar";

import BasketBall from "../public/images/sports/basketball.svg";
import Soccer from "../public/images/sports/soccer.svg";
import Billiard from "../public/images/sports/billiard.svg";
import Cycling from "../public/images/sports/cycling.svg";
import Gym from "../public/images/sports/gym.svg";
import PingPong from "../public/images/sports/ping-pong.svg";
import Tennis from "../public/images/sports/tennis.svg";
import VolleyBall from "../public/images/sports/volleyball.svg";

import Image from "next/image";
import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";

export default function SearchBySport() {
  const db = getFirestore(app);
  const [invitations, setInvitations] = useState<DocumentData[]>([]);

  async function getInvitations() {
    const querySnapshot = await getDocs(collection(db, "invitations"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setInvitations([...invitations, doc.data()]);
    });
  }

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <>
      <Navbar currentPage="Home" />
      <section className="py-6 bg-gray-100 text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leading-none text-center">
            Explore Sports by Type
          </h1>
          <p className="text-xl font-medium text-center">
            Find local players and teams based on the sports you love. Select
            from a variety of sports categories to discover opportunities that
            match your interests. Click on the icons below to start your search
            and join the action!
          </p>
          {/* <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4"></div> */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-8">
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={BasketBall} alt="Basketball" width={50} />
              <p className="font-semibold mt-1">Basketball</p>
            </div>
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={Soccer} alt="Soccer" width={50} />
              <p className="font-semibold mt-1">Soccer</p>
            </div>
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={Billiard} alt="Billiard" width={50} />
              <p className="font-semibold mt-1">Billiard</p>
            </div>
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={Cycling} alt="Cycling" width={50} />
              <p className="font-semibold mt-1">Cycling</p>
            </div>
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={Gym} alt="Gym" width={50} />
              <p className="font-semibold mt-1">Gym</p>
            </div>
            <div className="flex flex-col cursor-pointer w-33 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={PingPong} alt="PingPong" width={50} />
              <p className="font-semibold mt-1">PingPong</p>
            </div>
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={Tennis} alt="Tennis" width={50} />
              <p className="font-semibold mt-1">Tennis</p>
            </div>
            <div className="flex flex-col cursor-pointer w-30 h-30 items-center justify-center border-2 rounded border-gray-800 py-2 px-2">
              <Image src={VolleyBall} alt="VolleyBall" width={50} />
              <p className="font-semibold mt-1">VolleyBall</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
