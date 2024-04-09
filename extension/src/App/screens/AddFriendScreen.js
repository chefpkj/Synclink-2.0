import React,{useState,useEffect} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { baseURL } from '../config/constants';


const AddFriendScreen=()=>{


    return (
        <>

         {/* my header component    */}
         <>
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between">
        <Link to="/friends" className="text-sm mx-4 pt-3 px-2 font-extralight text-[#FCFCFC] hover:bg-[#4C525F] hover:rounded-md hover:text-white hover:cursor-pointer"><span>Close</span></Link>
        <span className="text-sm mx-4 pt-3 px-2 font-extralight	 text-[#FCFCFC] hover:cursor-pointer">View link</span>
        <span className="text-sm mx-4 pt-3 px-2 font-extralight text-[#2F353D] hover:cursor-default	">Edit</span>
        </div>
       </>
        
        </>
    )

}

export default AddFriendScreen;