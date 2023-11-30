import axios from "axios";

export const getFiles = async (url) => {
  try {
    const response = await axios({
      method: "PROPFIND",
      url: `https://nextcloud-test.sifast-projet.com/remote.php/dav/files/ged_sifast/${url}`,
      headers: {
        Authorization: "Basic Z2VkX3NpZmFzdDpnZWRfc2lmYXN0",
      },
    });

    const filesAndDirs = response.data
      .split("<d:response>")
      .slice(1)
      .map((item) => {
        const href = item.match(/<d:href>(.*?)<\/d:href>/)[1];
        const lastModified = item.match(
          /<d:getlastmodified>(.*?)<\/d:getlastmodified>/
        )[1];
        const contentLength =
          item.match(/<d:getcontentlength>(.*?)<\/d:getcontentlength>/)?.[1] ||
          null;
        const resourceType = item.includes("<d:collection/>")
          ? "directory"
          : "file";
        const contentType =
          item.match(/<d:getcontenttype>(.*?)<\/d:getcontenttype>/)?.[1] ||
          null;
        const etag = item.match(/<d:getetag>(.*?)<\/d:getetag>/)[1];

        return {
          href,
          lastModified,
          contentLength,
          resourceType,
          contentType,
          etag,
        };
      });

    return filesAndDirs;
  } catch (error) {
    console.error("Error in PROPFIND request:", error);
    return null;
  }
};
