import express from "express"
import { getCategory, createCategory, deleteCategory } from "../controller/Category.controller.js"

const router = express.Router()

router.get("/category", getCategory)
router.post("/category", createCategory)
router.delete("/category/:id", deleteCategory)

export default router