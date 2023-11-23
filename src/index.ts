import express, { Application } from "express"
import helmet from "helmet"
import cookieParser from "cookie-parser"
// import morgan from "morgan"
import {errorHandler, notFound} from "./middlewares/errorMiddleware"
import userRouter from "./routes/user.route"
import productRouter from "./routes/product.route"

const app: Application = express()

app.use(helmet())
// app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// routes
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)


app.get("/", (req, res) => {
    res.send("Blogger server is running🚀");
  });
  
app.all("*", (req, res) => {
    res.status(400).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });
  
  app.use(notFound);
  app.use(errorHandler);

  
export default app