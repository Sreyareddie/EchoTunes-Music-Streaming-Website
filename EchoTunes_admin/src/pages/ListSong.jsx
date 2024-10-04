import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const ListSong = () => {
  const [data, setData] = useState([]);
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div>
      <p className="text-gray-200 font-serif font-extrabold pt-3">All Songs</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-600 text-sm mr-5 bg-gray-900 text-white text-center">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
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
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p
                className="cursor-pointer font-extrabold"
                onClick={() => removeSong(item._id)}
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

export default ListSong;
