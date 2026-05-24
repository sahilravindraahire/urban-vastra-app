import { apiError } from "../utils/apiError.js";

export const admin = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        throw new apiError(401, "not authorized as an admin")
    }
}