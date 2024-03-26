import React,{useState} from 'react'
import { baseURL } from '../config/constants';
import { useNavigate,Link } from "react-router-dom";


const AddLinkScreen = () => {

  const [searchTxt,SetSearchTxt]=useState("");
  const navigate=useNavigate();

   //  function to post data to the server 
   function postData(dataa){ 
    if(dataa===""){
      navigate("home")
      return 0;
    }    
      
    const data = { "notes": [dataa] };
 
     fetch(baseURL+"/notes", {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
      },
      body: JSON.stringify(data),
      })
      .then((response) => {      
        if(response.status === 200){
        return response.json();     
        }
        else{     
        // dispatch(setLink("An error has occurred."));     
        // dispatch(setReduxTrigger(true));        //to trigger popup of something went wrong 
        console.log("error: Something went wrong in post notes api.",response);
        return 0;
       }
      })
      .then((data) => {
        if(data!==0){
        navigate("home");
        // dispatch(setLink("Link"));  
        // dispatch(setReduxTrigger(true));
        }
      });
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