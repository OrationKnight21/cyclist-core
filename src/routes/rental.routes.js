import { Router } from "express";
import {
  postRentalRecord,
  getRentedBike,
  unlockCycle,
} from "../controllers/rental.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const rentalRouter = Router();

// post rental record
rentalRouter.post("/rent", authMiddleware, postRentalRecord);
// get bikes
rentalRouter.get("/myBike", authMiddleware, getRentedBike);
rentalRouter.post("/unlock", authMiddleware, unlockCycle);

export { rentalRouter };
