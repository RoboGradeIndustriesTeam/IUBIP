import express from "express";
import makeCRUD from "../db/makeCRUD.js";
import {User} from "../db/models.js";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()

router.use("/", makeCRUD(User, undefined, userController.create, undefined, undefined))

router.get("/me", [authMiddleware], userController.me)
router.post("/login", userController.authorize)
router.post("/googleAuth", userController.googleAuth)
router.post("/vkAuth", userController.vkAuth)
router.post("/emailCode", userController.mailLogin)

export default router