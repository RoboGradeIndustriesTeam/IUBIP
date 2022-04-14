import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import fileController from "../controllers/fileController.js";

const router = express.Router() // fisting in your ass

router.get("/", [authMiddleware], fileController.get)
router.post("/", [authMiddleware], fileController.upload)
router.post("/folder", [authMiddleware], fileController.createFolder)
router.delete("/", [authMiddleware], fileController.delete)

export default router;















