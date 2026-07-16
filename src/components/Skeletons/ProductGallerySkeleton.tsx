import React from "react";

export default function ProductGallerySkeleton() {
  return (
    <div className="sm:max-2xl:mb-10 2xl:w-[90%] animate-pulse">
      {/* Main Image */}
      <div className="w-full aspect-[4/5] rounded-lg bg-gray-200" />

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="aspect-square rounded-md bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
