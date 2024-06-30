import {Router} from "express"
import { addProducts, getAllProducts, getProduct, rateProduct, searchProduct, unlistProduct } from "../Controllers/products.controller.js"
import { multerMiddleware } from "../Middlewares/multer.middleware.js"

const router = Router()

router.post("/products/addProducts", multerMiddleware, addProducts)
router.post("/products/getAllProducts",getAllProducts)
router.get("/products/searchProducts",searchProduct)
router.post("/products/unlistProducts",unlistProduct)
router.post("/products/rateProduct",rateProduct)
router.post("/product",getProduct)
export default router