import express from "express"
import {getAdminStats} from "../controllers/analytics.controller.js"
import {admin} from "../middlewares/admin.middleware.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"

const analyticsRouter = express.Router()

analyticsRouter.get("/", verifyJwt, admin, getAdminStats)

export default analyticsRouter