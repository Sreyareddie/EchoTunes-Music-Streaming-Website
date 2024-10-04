import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-slate-800 min-h-screen pl-[4vw] pr-[4vw]">
      <img
        src={assets.logo}
        className="mt-5 w-[max(15vw,100px)] hidden sm:block "
        alt=""
      />
      <img
        src={assets.logo_small}
        className="mt-5 w-[max(8vw,40px)] sm:hidden block"
        alt=""
      />
      <div className="flex flex-col gap-8 mt-10">
        <NavLink
          to="/add-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px}] drop-shadow-[-4px_4px_#ff4155] text-sm font-medium"
        >
          <img src={assets.add_song} className="w-4" alt="" />
          <p className="hidden sm:block font-bold font-serif ">Add Song</p>
        </NavLink>
        <NavLink
          to="/list-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px}] drop-shadow-[-4px_4px_#ff4155] text-sm font-medium"
        >
          <img src={assets.song_icon} className="w-4" alt="" />
          <p className="hidden sm:block font-bold font-serif ">All Songs </p>
        </NavLink>
        <NavLink
          to="/add-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px}] drop-shadow-[-4px_4px_#ff4155] text-sm font-medium"
        >
          <img src={assets.add_album} className="w-4" alt="" />
          <p className="hidden sm:block font-bold font-serif ">Add Album</p>
        </NavLink>
        <NavLink
          to="/list-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px}] drop-shadow-[-4px_4px_#ff4155] text-sm font-medium"
        >
          <img src={assets.album_icon} className="w-4" alt="" />
          <p className="hidden sm:block font-bold font-serif ">All Albums</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
