import React from "react";

export default function Spinner() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="text-white h-full w-full bg-black flex items-center justify-center"
    >
      <div role="status">
        <img
          className="w-96 h-96 inline  text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          src="SpinnerLogo.webp"
          alt=""
        />

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
