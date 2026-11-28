import { findOriginalUrl } from "./redirect.service.js";

const redirectUser = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const originalUrl = await findOriginalUrl(shortCode);

    return res.redirect(302, originalUrl);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { redirectUser };
