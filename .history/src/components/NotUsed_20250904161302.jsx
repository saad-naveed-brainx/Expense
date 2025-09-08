import React from "react";

export default function NotUsed({ pageName }) {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black rounded-xl px-12 pt-16 pb-8">
      <div className=" flex items-center justify-center h-full w-full ">
        <h1 className="text-4xl font-bold text-white">
          Welcome to the {pageName} Page. Its not used yet.
        </h1>
      </div>    
    </div>
  );
}
