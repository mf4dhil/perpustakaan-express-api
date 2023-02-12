import express from "express"
import { createBook, getBook } from "../controller/Book.controller.js"

const router = express.Router()

router.get('/books', getBook)
router.post('/books', createBook)

export default router