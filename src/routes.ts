import { Router } from "express";
import { getTags, createTag, updateTag, deleteTag } from "./controllers/tags_controller"

const router = Router();

router.get("/tags", getTags);
router.post("/tags", createTag);
router.put("/tags/:id", updateTag);
router.delete("/tags/:id", deleteTag);

export default router;