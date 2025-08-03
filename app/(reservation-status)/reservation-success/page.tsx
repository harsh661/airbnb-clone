"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ReservationSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h1>
      <p className="mb-2">Thank you for your reservation.</p>
      {sessionId && (
        <p className="text-sm text-gray-600">
          Session ID: <code>{sessionId}</code>
        </p>
      )}

      <Link
        href="/reservations"
        className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        View My Reservations
      </Link>
    </div>
  );
};

export default ReservationSuccessPage;
