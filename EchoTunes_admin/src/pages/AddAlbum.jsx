import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album added");
        setName("");
        setDesc("");
        setImage(false);
        setColor("ffffff");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-600 border-t-[#ef0061] rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmithandler}
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
          <p>Album Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-transparent outline-[#ef0061] border-2 border-gray-600 p-2.5 w-[max(40vw,250px)]"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2.5 pt-5">
          <p>Album Description</p>
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
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
