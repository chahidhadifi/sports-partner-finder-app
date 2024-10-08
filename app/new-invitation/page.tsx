"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import SportsList from "../data/SportsList";
import app from "@/lib/firebaseConfig";
import resizeImage from "@/lib/resizeImage";
import compressImage from "@/lib/compressImage";
import Navbar from "../components/Navbar";

export default function NewInvitation() {
  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [submitData, setSubmitData] = useState<SubmitData | null>({
    userName: "",
    email: "",
    image: "",
    invitationImage: "",
  });
  const [invitationImage, setInvitationImage] = useState<File | null>(null);

  interface SubmitData {
    [key: string]: any;
    userName?: string;
    email?: string;
    image?: string;
    invitationImage?: string;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInvitationImage(event.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invitationImage) {
      try {
        const resizedImage = await resizeImage(invitationImage, 180);
        const compressedImage = await compressImage(resizedImage, 1);
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `sports-partner/${compressedImage.name}`
        );
        const snapshot = await uploadBytes(storageRef, compressedImage);
        const url = await getDownloadURL(snapshot.ref);
        setSubmitData((prevValues) => ({
          ...prevValues,
          invitationImage: url,
        }));
        if (submitData?.invitationImage) {
          console.log(submitData);
          await setDoc(
            doc(db, "invitations", Date.now().toString()),
            submitData
          );
          router.push("/");
        }
      } catch (error) {
        console.error("Error processing file:", error);
      }
    } else {
      console.error("No file selected for upload.");
    }
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
    if (!session) {
      router.push("/");
    }
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
              {/* image */}
              <div>
                <input
                  type="file"
                  name="invitation-image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-span-full">
                <button
                  rel="noopener noreferrer"
                  type="submit"
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
