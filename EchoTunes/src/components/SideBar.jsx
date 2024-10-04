import React, { useState } from "react";
import { assets } from "../assets/assets";
import AddPlaylist from "./AddPlayList.jsx";
import ListPlayList from "./ListPlayList.jsx";

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const refreshPlaylists = () => {};

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around p-4">
        <img className="w-[50%]" src={assets.logo} alt="" />
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <div>
            <button
              onClick={handleModalToggle}
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
            >
              Create PlayList
            </button>
            <ListPlayList refreshPlaylists={refreshPlaylists} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative bg-[#121212] p-6 rounded-lg">
            <button
              className="absolute top-2 right-3 text-white text-xl font-bold hover:text-gray-400 "
              onClick={handleModalToggle}
            >
              &times;
            </button>
            <AddPlaylist
              setIsModalOpen={setIsModalOpen}
              refreshPlaylists={refreshPlaylists}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
