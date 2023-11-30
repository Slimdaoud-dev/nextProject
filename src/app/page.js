/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

"use client";
import React, { useState, useEffect } from "react";
import { deleteFile } from "./api/utils/delete"; // Corrected import path
import Link from "next/link";

import { getFiles } from "./api/utils/nextcloud";
import { addFolder2 } from "./api/utils/addFolder2";
import Loadspinner from "../../components/Loadspinner/Loadspinner";
import { rename } from "./api/utils/rename";
import FileUploadForm from "../../components/Buttonupload/FileUploadForm ";
import Move from "../../components/Move/move";
import { useClickedContext } from "./ClickedContext";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [folderName, setfolderName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState();

  const [updateTrigger, setUpdateTrigger] = useState(false);
  const { clicked, toggleClicked, clickedFile, updateClickedFile } =
    useClickedContext();

  useEffect(() => {
    async function fetchFiles() {
      try {
        setIsLoading(true);
        const fetchedFiles = await getFiles("");
        fetchedFiles.sort(compareFiles);
        setFiles(fetchedFiles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setIsLoading(false);
      }
    }

    fetchFiles();
  }, [updateTrigger]);

  const handleDelete = async (fileHref) => {
    try {
      const response = await deleteFile(fileHref);
      console.log("Delete response:", response);
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.href !== fileHref)
      );
      setUpdateTrigger((prevTrigger) => !prevTrigger);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handleAddFolder = async () => {
    try {
      const response = await addFolder2(newFolderName);
      if (!response) {
        setfolderName("");
        setUpdateTrigger((prevTrigger) => !prevTrigger);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleRename = async (fileHref, newFileName) => {
    try {
      console.log("Renaming file:", fileHref);
      const newLocationAndName = `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${newFileName}`;
      const response = await rename(fileHref, newLocationAndName);
      console.log("Rename response:", response);

      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.href === fileHref ? { ...file, href: newLocationAndName } : file
        )
      );
      setUpdateTrigger((prevTrigger) => !prevTrigger);
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  function handleclick(filee) {
    updateClickedFile(filee);
    toggleClicked();
  }

  return (
    <>
      {isLoading ? (
        <Loadspinner />
      ) : (
        <div>
          {clicked ? <Move path={"/"} clickedFile={clickedFile} /> : <></>}
          
          <div style={{marginBottom:10}}>
            <FileUploadForm /></div>
            <div >
            <button
              className="btn"
              onClick={() => window.my_modal_1.showModal()}
              
            >
              Add Folder{" "}
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAABhYWGjo6Nra2vPz8+Tk5NdXV3Ly8uampr6+vry8vKdnZ2Xl5eAgIDq6uq0tLTZ2dlxcXGGhobFxcXi4uLNzc0sLCzc3NxTU1NmZmY1NTWurq729vaMjIw/Pz+5ubkQEBBLS0scHBxDQ0MXFxcoKCh6enohISFqaIlVAAAEeklEQVR4nO2daVviMBRGW5BFkFUW2RRQx/n/v3AUsDetZcDpfXNN5j3fmqek90BpkmZLEkIIIYQQQgghpJTNaDusV2a9HW2sTUoZ9eepGvv6wNqnyPBZT+/IomHt5DJS/PmEZdfaK+MR4ffBxNrsxAtKME3vrN0OrHCCafpobffOAimYprfWfsk9VjBN28aCE7RgmnZsDXeFcBY3VVk+FbJ8MxW8zcWiVREZ5W/9qU6u/4YbSF/xdhq4JdBYL99vM3TiWOtmXXOyNqyIOyWFetn8AvvyvsFGgtirZz6QzFvqmV9LW4IY6efu1Hb1M7+SehbCEyD3qRiaNRbfshAgdavXLHuzNsYSG8I4y36IyP4a5IkOaY/LH7GJyP4awIZS2po9TMGGM3nUWNW+wYZOcWvVSgQbJk4rw+ilFNrwTgwRBe4VoA27YpguIFe4BNow18CYW7whhhuOUpfF1nvtDW7oVGuw/Fo+TspKJLxhx5PhgeXXuife0C31PbAqengwdFpoXqjl71Ufhm6h6IVcW96LYe51lw/cl+x+DJPRzq/izLshsIOyHCl2vRkmg75Pw7mB4TsTzZEQF8h6Lb0avtPpThsQJutaXvHzPvVtCCX3X//sKonKMJnuHMVTizsuw1xz9NQNE5lh8iCGq2NKbIbuoITjbRqdoXOfHltS0Rk6HaL1w3F8hjIuoX84FkNA96EJMnjm5nAshm+9Zgz05L1QrWAYHzQMHxqGDw3Dh4bhUzTc11oxUNufNYylXto4axhL26JNw+ChYfjQMHxoGD40DB8ahg8Nw4eG4UPD8KFh+NAwfGiIZDaujWeXT6uIoWHLuSwQO8PPMRLoVUDMDGX1AfDMJzNDmVYCXkDCzFAGY4Gny9IQBg3VoCEMGqpBQxg0VIOGMGioBg1h0FANGsKgoRo0hEFDNWgIg4ZqgA0750h62YV6fzlLAajhoOrKZUuFPg2k4UNZ0N/koXIUSEONfWp2laMAGurssbCtGgbQUGclqPsfbNiM3jD+u1TlSfNcOQqk4bQs5G/ys0uLpFu1xB//8BL/g023nI7U2pqdM+foLBZtVvOW9S972AvREAYN1aAhDBqqQUMYNFSDhjBoqAYNYdBQDRrCoKEaNIRBQzVoCIOGapgZrrML1bEXMjOU9e5jnWGZ7TyM3mbdcKbz2Iug6Wz1Rr/Wx1+FKw6EDw3Dh4bhQ8PwoWH40DB8aBg+/7Mhfp0xP8wKhjfZ8dd918NEBmMvD8eyDXHTODItZMrAcXdAecm3Mo5MC9lU+biomOzKEslGM47Q8dnZkYS9cWw6vIjQaSpcS1LAEwO94ExraZ2StpKUDk2D02Dt2Gw/E52009MnXN5cmSy17qY+rzeGAVajW9+5Kk4HUGEyz+tNmOQtctOL2mmMtN2ft3/5/OAoTPLbX/5EYCyKf9In64iUKamBxvUrltbO7i9/LhjODIVozC9/NAiezk/SHFrHpsHq7w35Rv+3dYSVmN9f0QIcTLbreoistw2dOaiEEEIIIYQQQiLkD8V1X/InJSKUAAAAAElFTkSuQmCC"
                height={20}
                width={20}
              />{" "}
            </button>
            </div>

            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Create Your Folder</h3>
                <br />
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <div className="modal-action">
                  <button className="btn" onClick={handleAddFolder}>
                    Add
                  </button>
                </div>
              </form>
            </dialog>
          
          <div className="overflow-x-auto" style={{ margin: "50px" }}>
            <table className="table" style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Modified</th>
                  <th></th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.href}>
                    <td>
                      <input type="checkbox" className="checkbox" />
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">
                            <Link
                              href={file.href.replace(
                                "/remote.php/dav/files/ged_sifast/",
                                ""
                              )}
                            >
                              {file.resourceType === "directory"
                                ? "📁 "
                                : "📄 "}
                              {file.href
                                .replace(
                                  "/remote.php/dav/files/ged_sifast/",
                                  ""
                                )
                                .replace(/%20/g, "")
                                .replace(/^\//, "")
                                .replace(/\/$/, "")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{file.contentLength}</td>
                    <td>{file.lastModified}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDelete(
                            file.href.replace(
                              "/remote.php/dav/files/ged_sifast/",
                              ""
                            )
                          )
                        }
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1906/1906791.png"
                          width={30}
                          height={30}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() =>
                          window[`my_modal_rename_${file.href}`].showModal()
                        }
                      >
                        Rename
                      </button>
                      <dialog
                        id={`my_modal_rename_${file.href}`}
                        className="modal"
                      >
                        <form method="dialog" className="modal-box">
                          <h3 className="font-bold text-lg">Rename</h3>
                          <br />

                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            defaultValue={`${file.href
                              .replace(`/remote.php/dav/files/ged_sifast/`, "")
                              .replace(/\/$/, "")}`}
                          />
                          <div className="modal-action">
                            <button
                              className="btn"
                              onClick={() => {
                                handleRename(file.href, newFileName);
                                setNewFileName("");
                                window[`my_modal_rename_${file.href}`].close();
                              }}
                            >
                              Rename
                            </button>
                          </div>
                        </form>
                      </dialog>
                    </td>
                    <td>
                      {clicked ? (
                        <></>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            handleclick(
                              `${file.href.replace(
                                "/remote.php/dav/files/ged_sifast/",
                                ""
                              )}`
                            );
                          }}
                        >
                          MOVE/COPY
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

function compareFiles(a, b) {
  if (a.resourceType === "directory" && b.resourceType !== "directory") {
    return -1;
  } else if (a.resourceType !== "directory" && b.resourceType === "directory") {
    return 1;
  } else {
    return a.href.localeCompare(b.href);
  }
}

export default Index;
