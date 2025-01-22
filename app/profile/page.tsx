"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "@/lib/firebaseConfig";
import UserInvitations from "../components/UserInvitations";
import Navbar from "../components/Navbar";
import Link from "next/link";

interface Invitation {
  id: string;
  invitationImage: string;
  sport: string;
  title: string;
  date: string;
  time: string;
  state: string;
  city: string;
  zip: string;
  email?: string;
}

function Profile() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [userPosts, setUserPosts] = useState<Invitation[]>([]); // Specify the type here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserPosts() {
      if (!session?.user?.email) return;

      try {
        const firebaseQuery = query(
          collection(db, "invitations"),
          where("email", "==", session.user.email)
        );
        const querySnapshot = await getDocs(firebaseQuery);
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Invitation[];
        setUserPosts(postsArray);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [session?.user?.email, db]);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar currentPage="" />
      <section className="p-8 px-12 bg-gray-100 text-gray-800">
        {userPosts.length === 0 ? (
          <p className="text-gray-500 text font-medium text-md">
            No invitations found, create new invitation
            <Link
              className="pl-[4px] text-lime-600 underline"
              href={"/new-invitation"}
            >
              here
            </Link>
          </p>
        ) : (
          <UserInvitations invitations={userPosts} />
        )}
      </section>
    </>
  );
}

export default Profile;
