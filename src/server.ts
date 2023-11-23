import connectDB from "./config/db";
import app from ".";

import { config } from "dotenv";

config();


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  
  connectDB(process.env.MONGO_URI!);
  console.log(`server running on port ${port}...`);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
