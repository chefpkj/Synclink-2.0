import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainShimmer } from "./components/Shimmer";
import NotesCard from "./components/NotesCard";
import { baseURL } from "../config/constants";

function doFilter(searchTxt, allLinks) {
  return allLinks.filter((link) =>
    link?.note?.toLowerCase()?.includes(searchTxt?.toLowerCase())
  );
}

const HomePageScreen = () => {
  // all state variables
  const [searchTxt, SetSearchTxt] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  // my api call
  useEffect(() => {
    getLinks();
  }, []);
  async function getLinks() {
    try {
      const data = await fetch(baseURL + "/notes", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("synclink_x-auth-token"),
        },
      });

      const json = await data.json();

      setFilterData(json);
      setAllData(json);
      setIsLoaded(true);
    } catch (error) {
      console.log(error, "error while fetching all notes");
      localStorage.removeItem("synclink_x-auth-token");
      navigate("/login");
    }
  }

  return (
    <>
      {/* my Header component */}
      <>
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between">
          <span className="text-xl mx-3 mt-2 font-extralight hover:cursor-pointer text-[#FCFCFC]">
            Synclink.
          </span>
          {/* my search component */}
          <>
            <input
              type="text"
              value={searchTxt}
              onChange={(e) => {
                SetSearchTxt(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setFilterData(doFilter(e.target.value, allData));
                }
              }}
              placeholder="Search type"
              className="w-48 m-2 bg-[#3C434E] p-2 text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]"
            />
          </>
          <Link
            to="/addLink"
            className="text-4xl mx-3 px-2 font-thin text-[#FCFCFC] hover:bg-[#4C525F] hover:cursor-pointer hover:rounded-md"
          >
            <span>+</span>
          </Link>
        </div>
      </>
      {/* my body component  */}
      <>
        {isLoaded ? (
          <div className="text-white">
            {" "}
            {filterData?.map((eachNotes, index) => (
              <NotesCard key={eachNotes?._id} link={eachNotes} linkId={eachNotes?._id} isSharedNotes={false} />
            ))}
          </div>
        ) : (
          <MainShimmer />
        )}
      </>
    </>
  );
};

export default HomePageScreen;
