import {Order} from "../models/Order.model.js"
import {Product} from "../models/Product.model.js"
import {User} from "../models/User.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

export const getAdminStats = asyncHandler(async(req, res) => {
    const totalOrder = await Order.countDocuments({})
    const totalProducts = await Product.countDocuments({})
    const totalUsers = await User.countDocuments({role: "user"})

    const orders = await Order.find({})

    if(!orders){
        throw new apiError(402, "error while geing orders")
    }

    const totalRevenue = orders.reduce((acc, item) => acc + item.totalAmount, 0)

    return res
    .status(200)
    .json(new apiResponse(200, {totalOrder, totalProducts, totalUsers, totalRevenue}))
})