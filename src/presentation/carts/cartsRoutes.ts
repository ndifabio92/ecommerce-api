import express from "express";
import { addProduct, getById, post, remove } from "./cartsController";

const router = express.Router();

router.get("/:id", getById);
router.post("/", post);
router.post("/:cid/product/:pid", addProduct);
router.delete("/:id", remove);

export default router;
