import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import path from "path"
import { connectDB } from "./db/dataBase.js"
import cookiePasrser from "cookie-parser"


const app = express()

app.use(express.json())
app.use(cookiePasrser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true
}))

import authRouter from "./routes/auth.route.js"
import producRouter from "./routes/product.route.js"
import orderRouter from "./routes/order.route.js"
import paymentRouter from "./routes/payment.route.js"
import analyticsRouter from "./routes/analytics.route.js"

app.use("/api/auth", authRouter)
app.use("/api/products", producRouter)
app.use("/api/orders", orderRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/analytics", analyticsRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.use((req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send('urbanVastra API is running in development mode....')
    })
}

const PORT = process.env.PORT || 5000

connectDB()
.then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`server is at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(`error while connecting server: ${error}`)
    }
})