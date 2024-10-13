import { Router } from "express";
import { getAllBikes } from "../controllers/bike.controller.js";

const bikeRouter = Router();

bikeRouter.get("/:page", getAllBikes);

export { bikeRouter };
