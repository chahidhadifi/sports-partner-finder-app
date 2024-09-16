import { DocumentData } from "firebase/firestore";
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  MapPinHouse,
  MapPinned,
} from "lucide-react";
import React, { useState } from "react";

function InvitationModal({ item }: { item: DocumentData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-center">
      <div
        onClick={() => setIsOpen(true)}
        className="text-xs cursor-pointer tracking-wider uppercase hover:underline pt-8 text-lime-600 flex flex-row items-center"
      >
        View details
        <ChevronRight size={13} className="ml-1" />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
              <div className="flex flex-row mb-4">
                <img
                  className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                  src={item.image}
                  alt="avatar"
                />
                <div className="mx-1">
                  <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {item.userName}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mx-auto">
                <img
                  className="h-full rounded-lg"
                  src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />
              </div>

              <div className="mt-5 text-center">
                <h3
                  className="text-lg font-medium text-gray-800 dark:text-white"
                  id="modal-title"
                >
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between w-full mt-[-10px] gap-x-2">
                <div className="flex flex-col flex-1 p-6">
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
                </div>
              </div>

              <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                <button
                  className="self-center w-full px-4 py-3 font-semibold rounded bg-lime-600 dark:bg-lime-400 text-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvitationModal;
