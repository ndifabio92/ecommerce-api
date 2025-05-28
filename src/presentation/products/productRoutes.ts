import express from "express";
import { get, getById, post, put, remove } from "./productController";

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", post);
router.put("/", put);
router.delete("/:id", remove);

export default router;
