import React,{useState,useEffect} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { baseURL } from '../config/constants';
import { InfoPageShimmer } from './components/Shimmer';
import DeleteIcon from '@mui/icons-material/Delete';
import QRCode from "react-qr-code";

const ViewSharedLinkScreen = () => {

  const navigate=useNavigate();

  const {id}=useParams();
  const [linkInfo,setLinkInfo]=useState("");
  const [isLoaded,setIsLoaded]=useState(false);

  const createdDate = linkInfo?.createdAt ? new Date(linkInfo.createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }) : "";

  //my api call to fetch links information
  useEffect(() => {
    getLinkInfo();
  }, []);
  async function getLinkInfo() {
    const data = await fetch(
      baseURL+"/sharedNotes/"+id,{
        method:'GET',
        headers:{
            "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
        }
      }
    );
    let json = await data.json();
    console.log(json?.message);
    setLinkInfo(json.message);
    setIsLoaded(true);
  };


   //function to delete the particular link
   async function deleteData(){
    const responsee=await fetch(baseURL+"/note/"+id,{
        method:'DELETE', 
        headers:{
            "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
        }
    })

    const response=await responsee.json();
    if(response?.status===200){
      navigate("/home")
    }
    else{
      console.log("Something went wrong in deleting Sharedlink.");
    }
  }

  return (
    <>
        {/* my header component    */}
        <>
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between">
        <Link to="/shared" className="text-sm mx-4 pt-3 px-2 font-extralight text-[#FCFCFC] hover:bg-[#4C525F] hover:rounded-md hover:text-white hover:cursor-pointer"><span>Close</span></Link>
        <span className="text-sm mx-4 pt-3 px-2 font-extralight	 text-[#FCFCFC] hover:cursor-pointer">View link</span>
        <span className="text-sm mx-4 pt-3 px-2 font-extralight text-[#2F353D] hover:cursor-default	">Edit</span>
        </div>
       </>
       {isLoaded?(
           <div>
            {/* heading */}
            <div className='text-[#B7BDCB] mt-2 ml-3 mb-1'>LINK INFORMATION</div>

              {/* my body component */}
             <div>
                <div className="flex justify-center">
                    <textarea rows={6} disabled={true} value={linkInfo?.note} className="bg-[#2F353D]  p-2 w-[97%] rounded-md hover:bg-[#4C525F] text-sm font-light text-white focus:outline-none focus:bg-[#4C525F] hover:cursor-text "/>
                </div>
             </div>

             {/* my friends information */}
             <div className='bg-[#2F353D] gap-[0.10rem] justify-center h-[2.9rem] mt-1 mx-1 p-2 rounded-md hover:bg-[#4C525F] text-white hover:cursor-pointer  flex flex-col text-sm font-normal tracking-wide' >
              <div style={{ fontSize: "0.55rem", lineHeight: "0.70rem"}} className="text-[#B5BBC9] font-extralight tracking-tight ">Username</div>
              <div className=''>{linkInfo?.sharedBy?.userName}</div>
             </div>

             <div className='bg-[#2F353D] gap-[0.10rem] justify-center h-[2.9rem] mt-1 mx-1 p-2 rounded-md hover:bg-[#4C525F] text-white hover:cursor-pointer  flex flex-col text-sm font-normal tracking-wide' >
              <div style={{ fontSize: "0.55rem", lineHeight: "0.70rem"}} className="text-[#B5BBC9] font-extralight tracking-tight ">Email</div>
              <div className=''>{linkInfo?.sharedBy?.email}</div>
             </div>

             



        
              {/* my delete button */}
             <div>
                 <div onClick={()=>{deleteData();}} id="buttonClicked" className="bg-[#2F353D] text-[#FD8C85] w-[97%] h-[2.9rem] mt-3 p-2 rounded-md hover:bg-[#4C525F] hover:text-[#fa7c73] hover:cursor-pointer flex ml-auto mr-auto text-sm font-normal tracking-wide ">
                    <div className='flex items-center'><DeleteIcon/></div>
                    <div className=" flex items-center ml-[0.20rem]"><div>Delete item</div></div>
                 </div>
             </div>

              {/* heading */}
              {/* below here */}
            <div className='text-[#B7BDCB] mt-2 ml-3 mb-1'>Created: {createdDate}</div>

        
             

           </div>
       ):(<InfoPageShimmer/>)}



    </>
   
    
  )
}

export default ViewSharedLinkScreen;