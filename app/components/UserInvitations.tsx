// UserInvitations.tsx
import { useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { Calendar, Clock, MapPinned, MapPin, MapPinHouse } from "lucide-react";
import app from "@/lib/firebaseConfig";

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
}

interface UserInvitationsProps {
  invitations: Invitation[];
}

export default function UserInvitations({ invitations }: UserInvitationsProps) {
  const db = getFirestore(app);
  const [userInvitations, setUserInvitations] =
    useState<Invitation[]>(invitations);

  const deleteInvitation = async (invitationId: string) => {
    try {
      await deleteDoc(doc(db, "invitations", invitationId));
      setUserInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId)
      );
    } catch (error) {
      console.error("Error deleting invitation:", error);
    }
  };

  if (!userInvitations?.length) {
    return <p className="text-gray-500">No invitations to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userInvitations.map((item) => (
        <article
          key={item.id}
          className="flex flex-col bg-gray-50 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative h-52">
            <img
              alt={item.title}
              className="object-cover w-full h-full"
              src={item.invitationImage || "/placeholder-image.jpg"}
            />
          </div>

          <div className="flex flex-col flex-1 p-4">
            <span className="text-xs tracking-wider uppercase text-lime-600 font-semibold">
              {item.sport}
            </span>

            <h3 className="mt-2 text-lg font-semibold leading-snug">
              {item.title}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{item.date}</span>
                <Clock className="w-4 h-4 ml-4 mr-2" />
                <span>{item.time}</span>
              </div>

              <div className="flex items-center">
                <MapPinned className="w-4 h-4 mr-2" />
                <span>{item.state}</span>
                <MapPin className="w-4 h-4 ml-4 mr-2" />
                <span>{item.city}</span>
              </div>

              <div className="flex items-center">
                <MapPinHouse className="w-4 h-4 mr-2" />
                <span>{item.zip}</span>
              </div>
            </div>

            <button
              onClick={() => deleteInvitation(item.id)}
              className="mt-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
            >
              Delete Invitation
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
