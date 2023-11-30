import axios from "axios";
export const copy = async (folderName, newLocationAndName) => {
  try {
    const response = await axios.request({
      method: "copy",
      url: `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${folderName}`,
      headers: {
        Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
        Destination: `${newLocationAndName}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in COPY request:", error);
    return null;
  }
};
