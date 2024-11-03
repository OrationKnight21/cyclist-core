import { Router } from "express";
import {
  logIn,
  signUp,
  deleteUser,
  verifyUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.delete("/delete", authMiddleware, deleteUser);
userRouter.get("/verify", authMiddleware, verifyUser);

export { userRouter };
