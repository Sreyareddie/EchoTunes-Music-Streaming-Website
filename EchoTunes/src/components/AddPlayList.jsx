import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { url } from "../App";
import { AuthContext } from "../context/AuthContext";

const AddPlaylist = ({ setIsModalOpen, refreshPlaylists }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(`${url}/api/playlist/add`, formData);

      if (response.data.success) {
        setName("");
        setDesc("");
        setImage(null);
        setColor("#ffffff");
        setIsModalOpen(false);

        refreshPlaylists();
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch (error) {
      setErrorMessage(
        "Error occurred: " +
          (error.response?.data?.message || "An error occurred")
      );
    }
  };

  return isLoggedIn ? (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 pt-3 text-gray-200"
      action=""
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 cursor-pointer"
            alt=""
          />
        </label>
      </div>
      <div>
        <div className="flex flex-col gap-2.5">
          <p>Playlist Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-transparent outline-[#ef0061] border-2 border-gray-600 p-2.5 w-[max(40vw,250px)]"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2.5 pt-5">
          <p>Playlist Description</p>
          <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="bg-transparent outline-[#ef0061] border-2 border-gray-600 p-2.5 w-[max(40vw,250px)]"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Background Colour</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
        />
      </div>
      <button
        type="submit"
        className="text-base bg-[#ff4155] text-white py-2.5 px-14 cursor-pointer"
      >
        Create
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  ) : (
    <p>Please Login</p>
  );
};

export default AddPlaylist;
