import React,{useState} from 'react'
import { baseURL } from '../config/constants';
import { useNavigate,Link } from "react-router-dom";



const AddLinkScreen = () => {

  const [searchTxt,SetSearchTxt]=useState("");
  const navigate=useNavigate();

   //  function to post data to the server 
   async function postData(dataa) {
    if (dataa === "") {
      navigate("home");
      return 0;
    }
  
    const data = { "note": dataa };
  
    try {
      const response = await fetch(baseURL + "/notes", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          "x-auth-token": localStorage.getItem("synclink_x-auth-token"),
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        navigate("home");
        // do something with responseData if needed
      } else {
        console.log("error: Something went wrong in post notes api.", response);
        navigate("home")
        return 0;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return 0;
    }
  }
  


  return (
    <>
      {/* my header component  */}
      <>
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between">
          <Link
            to="home"
            className="text-sm mx-4 pt-3 px-2 font-extralight	 text-[#FCFCFC] hover:bg-[#4C525F] hover:rounded-md hover:text-white hover:cursor-pointer"
          >
            <span>Cancel</span>
          </Link>
          <span className="text-sm mx-4 pt-3 px-2 font-extralight	 text-[#FCFCFC] hover:cursor-pointer">
            Add item
          </span>
          <span
            onClick={(e) => {
              postData(searchTxt);
            }}
            id="AddItem_cancel"
            className="text-sm mx-4 pt-3 px-2 font-extralight text-[#FCFCFC] hover:bg-[#4C525F] hover:cursor-pointer hover:rounded-md hover:text-white"
          >
            Save
          </span>
        </div>
      </>

      <>
        {/* my textarea  */}
        <div className="flex justify-center">
          <textarea
            rows="6"
            value={searchTxt}
            onChange={(e) => SetSearchTxt(e.target.value)}
            className="bg-[#2F353D] mt-7 p-2 w-[97%] rounded-md hover:bg-[#4C525F] text-sm font-light text-white focus:outline-none focus:bg-[#4C525F]"
          />
        </div>
      </>
    </>
  );
}

export default AddLinkScreen