import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import cors from 'cors';
import UploadRoute from './Routes/UploadRoute.js'
//Routes
const app = express();

const PORT=process.env.PORT || 5000

app.use(express.static('public'))
app.use('/images',express.static("images"))

//Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.set("strictQuery", false);
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app
      .listen(PORT, () =>
        console.log(`Listening at ${process.env.PORT}`)
      )    
  )
  .catch((error) => console.log(error));

  app.use('/auth',AuthRoute);
  app.use('/user',UserRoute);
  app.use('/post',PostRoute);
  app.use('/upload',UploadRoute)