import axios from "axios";

export const deleteFile = async (url) => {
  try {
    const response = await axios.delete(
      "https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/" +
        url,
      {
        headers: {
          Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
        },
      }
    );

    console.log("Réponse de suppression :", response.data);

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la demande DELETE :", error);
    return null;
  }
};
