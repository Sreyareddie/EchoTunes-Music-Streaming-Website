import React, { useContext, useState, useCallback } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { url } from "../App";
import { AuthContext } from "../context/AuthContext";

const Player = () => {
  const {
    track,
    seek,
    seekBar,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekDuration,
    updateTrack,
  } = useContext(PlayerContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToPlaylist, setIsAddingToPlaylist] = useState(false);

  const fetchPlaylists = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/api/playlist/list`);
      if (response.data.success) {
        setPlaylists(response.data.playLists || []);
      } else {
        toast.error("Failed to fetch playlists");
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      toast.error("Error loading playlists. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToPlaylist = async (playlistId) => {
    if (!track?._id || !playlistId || isAddingToPlaylist) {
      return;
    }

    setIsAddingToPlaylist(true);
    try {
      const response = await axios.post(
        `${url}/api/song/add-to-playlist`,
        {
          songId: track._id,
          playlistId: playlistId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedTrack = { ...track, playlist: playlistId };
        updateTrack(updatedTrack);
        toast.success("Song added to playlist successfully!");
        setPlaylistMenuOpen(false);
      } else {
        throw new Error(
          response.data.message || "Failed to add song to playlist"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error adding song to playlist. Please try again.";
      console.error("Error adding song to playlist:", error);
      toast.error(errorMessage);
    } finally {
      setIsAddingToPlaylist(false);
    }
  };

  const PlaylistMenu = () =>
    isLoggedIn ? (
      <div className="absolute right-1 bottom-16 bg-white p-4 rounded-lg shadow-lg min-w-[200px] z-50">
        <h4 className="font-bold text-black mb-2">Add to Playlist</h4>
        {isLoading ? (
          <div className="text-center py-2">Loading...</div>
        ) : playlists.length === 0 ? (
          <div className="text-gray-500 py-2">No playlists available</div>
        ) : (
          <ul className="max-h-[200px] overflow-y-auto">
            {playlists.map((playlist) => (
              <li
                key={playlist._id}
                onClick={() => {
                  if (!isAddingToPlaylist && !isLoading) {
                    addToPlaylist(playlist._id);
                  }
                }}
                className={`
                cursor-pointer text-gray-900 py-2 px-3 hover:bg-gray-100 rounded
                ${isAddingToPlaylist ? "opacity-50 cursor-not-allowed" : ""}
                ${
                  track?.playlist === playlist._id
                    ? "bg-gray-100 font-medium"
                    : ""
                }
              `}
              >
                {playlist.name}
                {track?.playlist === playlist._id && (
                  <span className="ml-2 text-green-500">✓</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    ) : (
      <div className="absolute right-1 bottom-16 bg-white p-4 rounded-lg shadow-lg min-w-[200px] z-50 text-center">
        <h4 className="font-bold text-black mb-2 ">Please Login</h4>
      </div>
    );
  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4 relative">
      <div className="hidden lg:flex items-center gap-4">
        <img
          className="w-12 h-12 object-cover rounded"
          src={track.image}
          alt=""
        />
        <div>
          <p className="font-medium">{track.name}</p>
          <p className="text-sm text-gray-400">{track.desc?.slice(0, 20)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seek}
            onClick={seekDuration}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-gradient-to-r from-[#ef0061] to-[#ff4155] rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <div className="relative">
          <img
            className="w-6 cursor-pointer"
            src={assets.playlist}
            alt="Playlist"
            onClick={() => {
              if (!playlistMenuOpen) {
                fetchPlaylists();
              }
              setPlaylistMenuOpen(!playlistMenuOpen);
            }}
          />
          {playlistMenuOpen && <PlaylistMenu />}
        </div>
      </div>
    </div>
  ) : null;
};

export default Player;
