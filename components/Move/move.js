/* eslint-disable @next/next/no-img-element */
import { useClickedContext } from "@/app/ClickedContext";
import { move } from "@/app/api/utils/move";
import Index from "@/app/page";
import { split } from "postcss/lib/list";
import React, { useState } from "react";
import Loadspinner from "../Loadspinner/Loadspinner";
import { copy } from "@/app/api/utils/copy";

const Move = ({ path, clickedFile }) => {
  const { clicked, toggleClicked } = useClickedContext();

  const handlemove = async (fileHref, newFileName) => {
    console.log("move file:", fileHref);
    const a = clickedFile.split("/");
    const b = a[a.length - 2];
    console.log(b);
    const newLocationAndName = `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${newFileName}${b}`;

    const response = await move(fileHref, newLocationAndName);
    console.log("Rename response:", response);

    toggleClicked();
  };
  const handlecopy = async (fileHref, newFileName) => {
    try {
      console.log("move file:", fileHref);
      const a = clickedFile.split("/");
      const b = a[a.length - 2];
      console.log(b);
      const newLocationAndName = `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${newFileName}${b}`;

      const response = await copy(fileHref, newLocationAndName);
      console.log("Rename response:", response);

      toggleClicked();
    } catch (error) {}
  };
  function handlecancel() {
    toggleClicked();
  }

  return (
    <div style={{marginLeft:'500px' , marginTop:5}}>
      <button
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => {
          handlemove(clickedFile, path);
        }}
      >
        Move
      </button>
      <button
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => {
          handlecopy(clickedFile, path);
        }}
      >
        Copy
      </button>

      <button
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handlecancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default Move;
