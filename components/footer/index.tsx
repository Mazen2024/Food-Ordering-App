import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import React from "react";

const Footer =async () => {
    const { copyRight} = await getTrans(await getCurrentLocale());

  return (
    <footer className="border-t p-8 text-center text-gray-400 font-semibold font-serif">
      <div className="container">
        <p>{copyRight} <span className="text-red-800 font-['cursive']">Magic Team</span></p>
      </div>
    </footer>
  );
};

export default Footer