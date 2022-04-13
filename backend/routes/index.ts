import express from "express";
//import PingController from "../controllers/authController";
import authRoutes from "./auth"
import catetegory from "./category"

const router = express.Router();

/*
router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});
*/
router.use("/api/v1/auth", authRoutes)
router.use("/api/v1/category", catetegory)

export default router;