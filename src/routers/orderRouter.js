import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import orderController from "../controllers/orderController.js";
import makeCRUD from "../db/makeCRUD.js";
import {Order} from "../db/models.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import userController from "../controllers/userController.js";

const router = express.Router()

export default router;
router.use("", makeCRUD(Order))

router.post("/expert", [authMiddleware, roleMiddleware("EXPEDITOR")], orderController.expert)
router.post("/seller", [authMiddleware, roleMiddleware("SELLER")], orderController.seller)