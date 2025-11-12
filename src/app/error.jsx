"use client";

import { useEffect } from "react";

export default function RootError({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-600">
            <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
            <p className="mb-4">{error.message}</p>
            <button
                onClick={() => reset()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
                Try Again
            </button>
        </div>
    );
}
