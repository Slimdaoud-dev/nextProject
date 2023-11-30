import axios from "axios";

export const addFile = async (fileName) => {
  try {
    const url =
      `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/` +
      fileName;
    const response = await axios.request({
      method: "PUT",
      url: url,
      headers: {
        Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
      },
    });

    console.log("Réponse de ajouter :", response.data);

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la demande ajouter:", error);
    return null;
  }
};
