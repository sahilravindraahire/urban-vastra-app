import express from "express"
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {admin} from "../middlewares/admin.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const producRouter = express.Router()

producRouter.get("/", getProducts)
producRouter.get("/:id", getProductById)
producRouter.post("/", verifyJwt, admin, upload.single("image"), createProduct)
producRouter.put("/:id", verifyJwt, admin, upload.single("image"), updateProduct)
producRouter.delete("/:id", verifyJwt, admin, deleteProduct)

export default producRouter