import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";
import cloudinary from "cloudinary";

const app = express();
//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

//endpoints
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(3000, () => {
  console.log("Server is running at port 3000..!");
});

/* cloudinary.config({
  cloud_name: "dtxxcyidt",
  api_key: "396525434287613",
  api_secret: "Kn1RfXQa7alvjVjP-mYqgWHRsRE",
});
 */
