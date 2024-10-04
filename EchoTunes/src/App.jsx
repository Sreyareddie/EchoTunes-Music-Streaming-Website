import Display from "./components/Display";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import React, { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";
export const url = "http://localhost:4000";
function App() {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <SideBar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio
        ref={audioRef}
        src={track ? track.audio : ""}
        preload="auto"
      ></audio>
    </div>
  );
}

export default App;
