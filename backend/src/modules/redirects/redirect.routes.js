import express from "express";
import { redirectUser } from "./redirect.controller.js";

const router = express.Router();

router.get("/:shortCode", redirectUser);

export default router;
