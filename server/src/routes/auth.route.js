import express from "express"
import {registerUser, verifyOtp, loginUser, logoutUser, getUsers} from "../controllers/auth.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {admin} from "../middlewares/admin.middleware.js"

const authRouter = express.Router()

authRouter.post("/register", registerUser)
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/login", loginUser)
authRouter.post("/logout", verifyJwt, logoutUser)
authRouter.get("/users", verifyJwt, admin, getUsers)

export default authRouter