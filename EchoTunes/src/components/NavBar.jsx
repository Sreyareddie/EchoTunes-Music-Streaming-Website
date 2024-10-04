import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { PlayerContext } from "../context/PlayerContext";
import { url } from "../App";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);
  const { isLoggedIn, logout, login } = useContext(AuthContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(query.length > 0);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);
  };

  const performSearch = async (query) => {
    try {
      const response = await fetch(
        `${url}/api/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Search error:", response.status, errorText);
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result) => {
    if (result.type === "album") {
      navigate(`/album/${result.id}`);
    } else if (result.type === "song") {
      playWithId(result.id);
    }
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleLoginModalToggle = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleLogin = (responseData) => {
    if (responseData.token) {
      login(responseData.token);

      setIsLoginModalOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center justify-center gap-2 flex-grow">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 pl-8 cursor-pointer mr-4"
          >
            <img className="w-6" src={assets.home_icon} alt="Home" />
          </div>
          <div className="relative">
            <img
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white"
              src={assets.search_icon}
              alt="Search"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-10 bg-inherit text-white py-0.5 border-[2px] rounded-2xl outline-[#ef0061] w-64"
            />
            {isSearching && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-20">
                {searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.map((result) => (
                      <li
                        key={result.id}
                        onClick={() => handleSearchResultClick(result)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        {result.title} ({result.type})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <img
                onClick={toggleUserMenu}
                className="w-8 h-8 rounded-full cursor-pointer"
                src={assets.user_profile}
                alt="User"
              />
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <ul className="py-2 text-gray-700">
                    <li
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p
              className="bg-white text-black font-bold text-[15px] px-4 py-1 rounded-2xl hover:bg-gradient-to-r from-[#ff4155] to-[#ef0061] hover:text-white hidden md:block cursor-pointer"
              onClick={handleLoginModalToggle}
            >
              Login
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img
          onClick={() => navigate(-1)}
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          src={assets.arrow_left}
          alt="Back"
        />
        <img
          onClick={() => navigate(1)}
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          src={assets.arrow_right}
          alt="Forward"
        />
      </div>

      {isLoginModalOpen && (
        <LoginModal onClose={handleLoginModalToggle} onLogin={handleLogin} />
      )}
    </>
  );
};

export default NavBar;
