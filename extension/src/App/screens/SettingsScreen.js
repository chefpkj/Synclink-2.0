import React,{useState,useEffect} from "react";
import { Link,useParams,useNavigate } from 'react-router-dom';


function doFilter(searchTxt, allLinks) {
    return allLinks.filter((link) =>
      link?.note?.toLowerCase()?.includes(searchTxt?.toLowerCase())
    );
}


const SettingsScreen=()=>{
    // all state variables
    const [searchTxt, SetSearchTxt] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [allData, setAllData] = useState([]);


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
                className="w-48 mr-[4.7rem] m-2 bg-[#3C434E] p-2 text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]"
              />
            </>
           
          </div>
        </>

        <div className="text-white">My Settings</div>
   

        </>
    )
}

export default SettingsScreen;