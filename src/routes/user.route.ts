import express from "express"
import app from ".."
import { getMe, loginUser, registerUser } from "../controllers/user.controller"
import { isAuthenticated } from "../middlewares/authMiddlewares"

const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)

router.use(isAuthenticated)
router.get("/me", getMe)


const userRouter = router
export default userRouter