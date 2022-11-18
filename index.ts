import "dotenv/config";
import express, { Express , Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";
import mongoose from 'mongoose'
import {v2 as cloudinary} from 'cloudinary'

//initialize app
const app: Express = express();

//connect to database 
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to database with success"))
  .catch((error) => console.log(error));

//initialize cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


//initialize middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
//init router
app.use('/api/v1', router)

//init port
app.listen(process.env.PORT, () => {
  console.log(`Port is started on port ${process.env.PORT}`);
});
