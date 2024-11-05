import { Router } from "express";
import {
  postRentalRecord,
  getAvailableBikes,
} from "../controllers/rental.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const rentalRouter = Router();

// post rental record
rentalRouter.post("/setup", authMiddleware, postRentalRecord);
// get bikes
rentalRouter.get("/bikes", authMiddleware, getAvailableBikes);

export { rentalRouter };
