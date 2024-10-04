import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (request, response) => {
  try {
    const name = request.body.name;
    const desc = request.body.desc;
    const bgColor = request.body.bgColor;
    const imageFile = request.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);
    await album.save();

    response.json({ success: true, message: "Album Added" });
  } catch (error) {
    response.json({ success: false });
  }
};

const listAlbum = async (request, response) => {
  try {
    const allAlbums = await albumModel.find({});
    response.json({ success: true, albums: allAlbums });
  } catch (error) {
    response.json({ success: false });
  }
};

const removeAlbum = async (request, response) => {
  try {
    await albumModel.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "Album Removed" });
  } catch (error) {
    response.json({ success: false });
  }
};

export { addAlbum, listAlbum, removeAlbum };
