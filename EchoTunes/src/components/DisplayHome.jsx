import React from "react";
import NavBar from "./NavBar";
import AlbumCard from "./AlbumCard";
import SongCard from "./SongCard";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";
const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  return (
    <>
      <NavBar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumCard
              key={index}
              image={item.image}
              name={item.name}
              desc={item.desc}
              id={item._id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongCard
              key={index}
              image={item.image}
              name={item.name}
              desc={item.desc}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
