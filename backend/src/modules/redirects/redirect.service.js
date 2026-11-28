import URL from "../urls/url.model.js";

const findOriginalUrl = async (shortCode) => {
  const url = await URL.findOne({
    shortCode,
    isActive: true,
  });

  if (!url) {
    throw new Error("Short URL not found");
  }

  if (url.expiresAt && url.expiresAt <= new Date()) {
    throw new Error("Short URL has expired");
  }

  return url.originalUrl;
};

export { findOriginalUrl };
