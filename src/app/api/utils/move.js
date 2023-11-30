import axios from "axios";
export const move = async (folderName, newLocationAndName) => {
  try {
    const response = await axios.request({
      method: "MOVE",
      url: `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${folderName}`,
      headers: {
        Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
        Destination: `${newLocationAndName}`,
        Overwrite: "T",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in MOVE request:", error);
    return null;
  }
};
