import React,{useState, useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { MainShimmer } from "./components/Shimmer";
import NotesCard from "./components/NotesCard";
import { baseURL } from "../config/constants";

function doFilter(searchTxt, allLinks) {
    return allLinks.filter((link) =>
      link?.note?.toLowerCase()?.includes(searchTxt?.toLowerCase())
    );
}

const SharedNotesScreen = () => {
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
        const data = await fetch(baseURL + "/sharedNotes", {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("synclink_x-auth-token"),
          },
        });
  
        const json = await data.json();
        setFilterData(json?.message);
        setAllData(json?.message);
        setIsLoaded(true);
      } catch (error) {
        console.log(error, "error while fetching all shared notes");
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
                className="grow m-2 bg-[#3C434E] p-2 text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]"
              />
            </>
            <Link
            to="home"
            className="text-sm mx-4 pt-3 px-2 font-extralight	 text-[#FCFCFC] hover:bg-[#4C525F] hover:rounded-md hover:text-white hover:cursor-pointer"
          >
            <span>Cancel</span>
          </Link>
          </div>
        </>
        {/* my body component  */}
        <>
          {isLoaded ? (
            <div className="text-white">
              {filterData?.map((eachNotesData) => (
                <NotesCard key={eachNotesData?._id} link={eachNotesData} linkId={eachNotesData?._id} isSharedNotes={true}  />
              ))}
             
            </div>
          ) : (
            <MainShimmer />
          )}
        </>
      </>
    );
};
  
  export default SharedNotesScreen;
  