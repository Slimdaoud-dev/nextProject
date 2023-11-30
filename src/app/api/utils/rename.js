import axios from "axios";
export const rename = async (folderName, newLocationAndName) => {
  try {
    const response = await axios.request({
      method: "MOVE",
      url: `https://nextcloud-test.sifast-projet.com${folderName}`,
      headers: {
        Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
        Destination: `${newLocationAndName}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in PROPFIND request:", error);
    return null;
  }
};
