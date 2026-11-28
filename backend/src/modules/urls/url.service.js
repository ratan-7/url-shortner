import crypto from "node:crypto";
import URL from "./url.model.js";
import { env } from "../../config/env.js";

const generateShortCode = () => {
  return crypto.randomBytes(5).toString("base64url").slice(0, 7);
};

const generateManagementToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const validateOriginalUrl = (originalUrl) => {
  try {
    const parsedUrl = new globalThis.URL(originalUrl);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Only HTTP and HTTPS URLs are allowed");
    }

    return parsedUrl.toString();
  } catch (error) {
    if (error.message === "Only HTTP and HTTPS URLs are allowed") {
      throw error;
    }

    throw new Error("Invalid URL");
  }
};

const createShortUrl = async ({ originalUrl, userId = null }) => {
  const validatedUrl = validateOriginalUrl(originalUrl);

  const ownerType = userId ? "user" : "guest";

  let managementToken = null;

  if (!userId) {
    managementToken = generateManagementToken();
  }

  const managementTokenHash = managementToken
    ? hashToken(managementToken)
    : null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const shortCode = generateShortCode();

    try {
      const url = await URL.create({
        originalUrl: validatedUrl,
        shortCode,
        ownerType,
        userId,
        managementTokenHash,
      });

      return {
        id: url._id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${env.BASE_URL}/${url.shortCode}`,
        ownerType: url.ownerType,
        expiresAt: url.expiresAt,
        createdAt: url.createdAt,
        ...(managementToken && { managementToken }),
      };
    } catch (error) {
      if (error.code === 11000 && attempt < 4) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("Unable to generate a unique short code");
};

export { createShortUrl };
