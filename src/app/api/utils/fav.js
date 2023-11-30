import axios from "axios";

const setFavorite = async (path, isFavorite) => {
  const xmlData = `
    <?xml version="1.0"?>
    <d:propertyupdate xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns">
      <d:set>
        <d:prop>
          <oc:favorite>${isFavorite ? 1 : 0}</oc:favorite>
        </d:prop>
      </d:set>
    </d:propertyupdate>
  `;

  try {
    const response = await axios({
      method: "PROPPATCH",
      url: `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${path}`,
      data: xmlData,
      headers: {
        "Content-Type": "application/xml",
        Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while setting favorite status");
  }
};

export { setFavorite };
