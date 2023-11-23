import express from "express"
import { isAuthenticated } from "../middlewares/authMiddlewares"
import { createProduct, getProduct } from "../controllers/product.controller"

const router = express.Router()


router.use(isAuthenticated)
router.post("/", createProduct)

router.get("/:id", getProduct)

const productRouter = router
export default productRouter