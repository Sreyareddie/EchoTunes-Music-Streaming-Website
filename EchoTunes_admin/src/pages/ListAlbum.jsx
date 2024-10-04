import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-gray-200 font-serif font-extrabold pt-3">All Albums</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-600 text-sm mr-5 bg-gray-900 text-white text-center">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-700 text-sm mr-5 text-white text-center"
            >
              <img className="w-full" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <p>
                <input type="color" value={item.bgColor} />
              </p>
              <p
                className="cursor-pointer font-extrabold"
                onClick={() => removeAlbum(item._id)}
              >
                ❌
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
