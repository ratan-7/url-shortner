import { createShortUrl } from "./url.service.js";

const createUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required",
      });
    }

    if (typeof originalUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: "URL must be a string",
      });
    }

    const result = await createShortUrl({
      originalUrl,
      userId: req.user?.userId || null,
    });

    return res.status(201).json({
      success: true,
      message: "URL shortened successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to shorten URL",
    });
  }
};

export { createUrl };
