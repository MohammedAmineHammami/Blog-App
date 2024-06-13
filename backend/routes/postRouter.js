import express from "express";
import {
  getPost,
  getPosts,
  updatePost,
  deletePost,
  addPost,
} from "../controllers/postControllers.js";

const postRouter = express.Router();

postRouter.get("/all", getPosts);
postRouter.post("/add", addPost);
postRouter.get("/single/:id", getPost);
postRouter.delete("/delete/:id", deletePost);
postRouter.put("/update", updatePost);

export default postRouter;
