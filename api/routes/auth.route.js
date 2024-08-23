import express from "express";
import { signOut, signin, signup } from "../controllers/auth.controller.js";
import {
  getFromCart,
  addToCart,
  removeFromCart,
  emptyCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/emptyCart/:userId", emptyCart);
router.get("/getFromCart/:userId", getFromCart);

export default router;
