import React,{useState,useEffect} from "react";
import { Link,useParams,useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { baseURL } from "../config/constants";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteIcon from '@mui/icons-material/Delete';


function doFilter(searchTxt, allLinks) {
    return allLinks.filter((eachFriendData) =>{
        return (eachFriendData?.userName?.toLowerCase()?.includes(searchTxt?.toLowerCase()))||(eachFriendData?.email?.toLowerCase()?.includes(searchTxt?.toLowerCase()))
    }
      
    );
}


const FriendsScreen=()=>{
  // all state variables
  const [searchTxt, SetSearchTxt] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

 // my api call
 useEffect(() => {
    getLinks();
  }, [reload]);


  async function getLinks() {
    try {
      const data = await fetch(baseURL + "/friends", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("synclink_x-auth-token"),
        },
      });

      const json = await data.json();
      console.log(json?.message)
      setFilterData(json?.message);
      setAllData(json?.message);
      setIsLoaded(true);
    } catch (error) {
      console.log(error, "error while fetching all friends");
      localStorage.removeItem("synclink_x-auth-token");
      navigate("/login");
    }
  }


    //function to delete the particular link
    async function deleteData(id){
        const responsee=await fetch(baseURL+"/friends/"+id,{
            method:'DELETE', 
            headers:{
                "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
            }
        })
    
        const response=await responsee.json();
        if(response?.status===200){
          setReload(!reload)
        console.log("Shared Note deleted!")
        }
        else{
          console.log("Something went wrong in deleting link.");
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
              className="w-48 mr-[4.7rem] m-2 bg-[#3C434E] p-2 text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]"
            />
          </>
        </div>
      </>

      {/* my Body Screen */}
      <div onClick={()=>{
            navigate("/addFriend");
        }} className="bg-[#2F353D]  h-[2.9rem] mt-2 mx-1 p-2 rounded-md hover:bg-[#4C525F] hover:cursor-pointer flex justify-center items-center">
        <div className=" gap-2 flex items-center">
          <PersonAddIcon style={{ color: "white" }} />
          <div className="text-white text-sm ">Add Friend</div>
        </div>
      </div>

      <div className="text-[#B7BDCB] mt-2 ml-3 mb-1">Friends</div>

      {isLoaded?(
        <div >
            {filterData?.map((eachFriendData)=>{
                return (
                    <div className="bg-[#2F353D] gap-2 text-[#b8becc] hover:text-white  h-[2.9rem] mt-2 mx-1 p-2 rounded-md hover:bg-[#4C525F] hover:cursor-pointer flex items-center group">
                     
                     <PersonOutlineIcon />

                     <div >
                       <div className="text-sm">{eachFriendData?.userName}</div>
                       <div style={{fontSize:"0.70rem",lineHeight:"1rem"}} >{eachFriendData?.email}</div>
                     </div>

                     <div onClick={()=>{deleteData(eachFriendData?.userId)}} className="group-hover:text-[#E6847C]  ml-auto mr-3">
                        <DeleteIcon className="hover:text-red-400"/>
                     </div>   
                     
                     
                    </div>
                   
                )
            })}

        </div>

      ):(

        <div className="text-white">
            data not loaded yet
        </div>

      )};
    </>
  );
}

export default FriendsScreen;