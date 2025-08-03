"use client";

import Link from "next/link";
import React from "react";

const ReservationCancelledPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Payment Cancelled
      </h1>
      <p>Your reservation was not completed. You can try again anytime.</p>

      <Link
        href="/"
        className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ReservationCancelledPage;
