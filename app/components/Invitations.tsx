import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import {
  MapPinHouse,
  MapPinned,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";
import app from "@/lib/firebaseConfig";
import InvitationModal from "./InvitationModal";

export default function Invitations({
  sportType,
  zipCode,
}: {
  sportType: string | null;
  zipCode: string | null;
}) {
  const db = getFirestore(app);
  const [invitations, setInvitations] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function getInvitations() {
      const querySnapshot = await getDocs(collection(db, "invitations"));
      const invitationsList: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const docDate = new Date(`${data.date}T${data.time}:00`);
        const now = new Date();
        if (docDate > now) {
          if (sportType == null && zipCode == null) {
            invitationsList.push(data);
          } else {
            if (sportType == data.sport || zipCode == data.zip) {
              invitationsList.push(data);
            }
          }
        }
      });
      setInvitations(invitationsList);
    }

    getInvitations();
  }, [db, invitations]);
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {invitations &&
          invitations.map((item, index) => (
            <article key={index} className="flex flex-col bg-gray-50">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Te nulla oportere reprimique his dolorum"
              >
                <img
                  alt=""
                  className="object-cover w-full h-52 bg-gray-500"
                  src={item.invitationImage}
                />
              </a>
              <div className="flex flex-col flex-1 p-6">
                <div className="text-xs tracking-wider uppercase text-lime-600">
                  {item.sport}
                </div>
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                  {item.title}
                </h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                  <span className="flex flex-row items-center">
                    <Calendar size={18} className="mr-2" />
                    {item.date}
                  </span>
                  <span className="flex flex-row items-center">
                    <Clock size={18} className="mr-2" />
                    {item.time}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                  <span className="flex flex-row items-center">
                    <MapPinned size={18} className="mr-2" />
                    {item.state}
                  </span>
                  <span className="flex flex-row items-center">
                    <MapPin size={18} className="mr-2" />
                    {item.city}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                  <span className="flex flex-row items-center">
                    <MapPinHouse size={18} className="mr-2" />
                    {item.zip}
                  </span>
                </div>
                <InvitationModal item={item} />
              </div>
            </article>
          ))}
      </div>
    </>
  );
}
