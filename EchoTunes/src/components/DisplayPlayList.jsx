import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayPlayList = () => {
  const { id } = useParams();
  const [playListData, setPlayListData] = useState("");

  const { playWithId, playListsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    playListsData.map((item) => {
      if (item._id === id) {
        setPlayListData(item);
      }
    });
  }, [id, playListsData]);

  return playListData ? (
    <>
      <NavBar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={playListData.image} alt="" />
        <div className="flex flex-col">
          <p>PlayList</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {playListData.name}
          </h2>
          <h4>{playListData.desc}</h4>
          <p className="mt-1 text-xs">
            <img className="inline-block w-20" src={assets.logo} alt="" />•
            124,243,796 saves • <b>{playListData.songs.length} songs</b> about 3
            hr 2 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#afafaf]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>PlayList</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData
        .filter((item) => item.playlist === playListData._id)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#afafaf] hover:bg-[#ffffff26] cursor-pointer"
            key={index}
          >
            <p className="text-white">
              <b className="mr-4 text-[#afafaf]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{playListData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayPlayList;
