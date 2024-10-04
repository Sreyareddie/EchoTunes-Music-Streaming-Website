import { v2 as cloudinary } from "cloudinary";
import playListModel from "../models/playListModel.js";

const addPlayList = async (request, response) => {
  try {
    const name = request.body.name;
    const desc = request.body.desc;
    const bgColor = request.body.bgColor;
    const imageFile = request.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const playListData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const playList = playListModel(playListData);
    await playList.save();

    response.json({ success: true, message: "playList Added" });
  } catch (error) {
    response.json({ success: false });
  }
};

const listPlayList = async (request, response) => {
  try {
    const allPlayLists = await playListModel.find({});
    response.json({ success: true, playLists: allPlayLists });
  } catch (error) {
    response.json({ success: false });
  }
};

const removePlayList = async (request, response) => {
  try {
    await playListModel.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "playList Removed" });
  } catch (error) {
    response.json({ success: false });
  }
};

const getPlayListSongs = async (request, response) => {
  try {
    const playlistId = request.params.id;
    const playlist = await playListModel.findById(playlistId).populate("songs");

    if (!playlist) {
      return response
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    }

    response.json({
      success: true,
      playlist,
    });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Error fetching playlist songs" });
  }
};

export { addPlayList, listPlayList, removePlayList, getPlayListSongs };
