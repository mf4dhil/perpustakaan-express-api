import express from "express"
import { createGenre, deleteGenre, getGenre } from "../controller/Genre.controller.js"

const router = express.Router()

router.get("/genre", getGenre)
router.post("/genre", createGenre)
router.delete("/genre/:id", deleteGenre)

export default router