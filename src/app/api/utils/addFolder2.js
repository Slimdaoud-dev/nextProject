import axios from "axios";

export const addFolder2 = async (folderName) => {
  try {
    const url =
      `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/` +
      folderName;
    const response = await axios.request({
      method: "MKCOL",
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
