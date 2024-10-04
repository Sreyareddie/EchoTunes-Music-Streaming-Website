import {
  addPlayList,
  listPlayList,
  removePlayList,
  getPlayListSongs,
} from "../controllers/playListController.js";
import express from "express";
import upload from "../middleware/multer.js";

const playListRouter = express.Router();

playListRouter.post("/add", upload.single("image"), addPlayList);
playListRouter.get("/list", listPlayList);

playListRouter.post("/remove", removePlayList);
playListRouter.get("/songs", getPlayListSongs);

export default playListRouter;
