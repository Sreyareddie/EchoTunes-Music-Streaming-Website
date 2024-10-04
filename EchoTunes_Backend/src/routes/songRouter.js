import {
  addSong,
  listSong,
  removeSong,
  addToPlayList,
} from "../controllers/songController.js";
import express from "express";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
);

songRouter.get("/list", listSong);

songRouter.post("/remove", removeSong);

songRouter.post("/add-to-playlist", addToPlayList);
export default songRouter;
