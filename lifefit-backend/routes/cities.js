import express from "express";
import { getCities, getCityByName } from "../controllers/cityController.js";

const router = express.Router();

router.get("/", getCities); // keep this if needed
router.get("/:city", getCityByName);

export default router;
