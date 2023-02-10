import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session"
import db from "./config/Database.js"

import userRouter from "./routes/User.routes.js"
import bookRouter from "./routes/Book.routes.js"
import categoryRouter from "./routes/Category.routes.js"
import genreRouter from "./routes/Genre.routes.js"

dotenv.config()

const app = express()

// ;(async() => {
//   await db.sync();
// })();

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}))

app.use(express.json())
app.use(userRouter)
app.use(bookRouter)
app.use(categoryRouter)
app.use(genreRouter)

app.listen(process.env.APP_PORT, () => {
  console.log("Server app is listening......")
})