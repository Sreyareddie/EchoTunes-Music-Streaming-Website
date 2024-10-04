import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import { AuthContext } from "../context/AuthContext";

const ListPlayList = ({ refreshPlaylists }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${url}/api/playlist/list`);
      if (response.data.success) {
        setData(response.data.playLists || []);
      }
    } catch (error) {
      toast.error("Error occurred while fetching playlists");
    } finally {
      setLoading(false);
    }
  };

  const removePlaylist = async (id) => {
    try {
      const response = await axios.post(`${url}/api/playlist/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchPlaylists();
      }
    } catch (error) {
      toast.error("Error occurred while removing the playlist");
    }
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (confirmDelete) {
      removePlaylist(id);
    }
  };

  useEffect(() => {
    fetchPlaylists();
    refreshPlaylists(fetchPlaylists);
  }, [refreshPlaylists]);

  if (loading) {
    return (
      <p className="text-gray-200 font-serif font-extrabold pt-3">
        Loading playlists...
      </p>
    );
  }

  return isLoggedIn ? (
    <div>
      <br />
      <h2 className="pb-3 font-serif font-semibold">Your Playlists</h2>
      <ul className="list-disc text-gray-300">
        {data.length > 0 ? (
          data.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-700 py-2 relative group"
            >
              <span
                onClick={() => navigate(`/playlist/${item._id}`)}
                className="cursor-pointer"
              >
                {item.name}
              </span>
              <div className="pl-40">
                <span
                  className="cursor-pointer font-extrabold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  &#x1F5D1;
                </span>
                <span className="absolute left-50 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-1">
                  Delete
                </span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No playlists available</p>
        )}
      </ul>
    </div>
  ) : null;
};

export default ListPlayList;
