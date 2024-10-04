import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import playListModel from "../models/playListModel.js";

const addSong = async (request, response) => {
  try {
    const name = request.body.name;
    const desc = request.body.desc;
    const album = request.body.album;
    const imageFile = request.files.image[0];
    const audioFile = request.files.audio[0];

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "auto",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      audio: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);
    await song.save();

    response.json({ success: true, message: "Song Added" });
  } catch (error) {
    response.json({ success: false });
  }
};

const listSong = async (request, response) => {
  try {
    const allSongs = await songModel.find({});
    response.json({ success: true, songs: allSongs });
  } catch (error) {
    response.json({ success: false });
  }
};

const removeSong = async (request, response) => {
  try {
    await songModel.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "Song Removed" });
  } catch (error) {
    response.json({ success: false });
  }
};
const addToPlayList = async (req, res) => {
  const { songId, playlistId } = req.body;

  try {
    if (!songId || !playlistId) {
      return res.status(400).json({
        success: false,
        message: "Both songId and playlistId are required",
      });
    }

    const playlist = await playListModel.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const song = await songModel.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song is already in playlist",
      });
    }

    playlist.songs.push(songId);
    await playlist.save();

    song.playlist = playlistId;
    await song.save();

    return res.status(200).json({
      success: true,
      message: "Song added to playlist successfully",
    });
  } catch (error) {
    console.error("Add to playlist error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add song to playlist",
      error: error.message,
    });
  }
};

export { addSong, listSong, removeSong, addToPlayList };
