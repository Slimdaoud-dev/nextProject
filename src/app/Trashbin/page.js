"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Loadspinner from "../../../components/Loadspinner/Loadspinner";

function Trashbin() {
  const [trashbinContent, setTrashbinContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchTrashbinContent() {
      try {
        setIsLoading(true);
        const response = await axios.request({
          method: "PROPFIND",
          url: "https://nextcloud-test.sifast-projet.com/remote.php/dav/trashbin/ged_sifast/trash",
          headers: {
            Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
          },
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        const namespaces = {
          d: "DAV:",
          oc: "http://owncloud.org/ns",
        };

        const items = xmlDoc.getElementsByTagNameNS(namespaces.d, "response");
        const trashbinItems = [];

        for (let i = 1; i < items.length; i++) {
          const item = items[i];
          const hrefElement = item.getElementsByTagNameNS(
            namespaces.d,
            "href"
          )[0];
          const filename = hrefElement.textContent.replace(
            "/remote.php/dav/trashbin/ged_sifast/trash/",
            "📁"
          );

          const originalLocation = item.getElementsByTagNameNS(
            namespaces.oc,
            "trashbin-original-location"
          )[0]?.textContent;
          const deletionTime = item.getElementsByTagNameNS(
            namespaces.d,
            "getlastmodified"
          )[0]?.textContent;

          trashbinItems.push({
            filename,
            originalLocation,
            deletionTime,
          });
        }

        setTrashbinContent(trashbinItems);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trashbin content:", error);
        setIsLoading(false);
      }
    }

    fetchTrashbinContent();
  }, []);

  async function restoreItem(originalLocation) {
    try {
      await axios.request({
        method: "MOVE",
        url: `https://nextcloud-test.sifast-projet.com/remote.php/dav/trashbin/ged_sifast/trash/${encodeURIComponent(
          originalLocation
        )}`,
        headers: {
          Destination: `https://nextcloud-test.sifast-projet.com/remote.php/dav/trashbin/ged_sifast/restore/${encodeURIComponent(
            originalLocation
          )}`,
          Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
        },
      });
    } catch (error) {
      console.error("Error restoring item:", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loadspinner />
      ) : (
        <div className="overflow-x-auto" style={{ margin: "100px" }}>
          <table className="table" style={{ alignItems: "center" }}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>

                <th>Deletion Time</th>
                <th>Original Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trashbinContent.map((item) => (
                <tr key={Math.random()}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{item.filename}</div>
                      </div>
                    </div>
                  </td>
                  <td> {item.deletionTime}</td>
                  <td> {item.originalLocation}</td>
                  <td>
                    <button onClick={() => restoreItem(item.originalLocation)}>
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Trashbin;
