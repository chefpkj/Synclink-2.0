import React,{useState,useEffect} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { baseURL, trashUrl } from '../config/constants';
import { InfoPageShimmer } from './components/Shimmer';

const ViewLinkScreen = () => {

  const navigate=useNavigate();

  const {id}=useParams();
  const [linkInfo,setLinkInfo]=useState("");
  const [isLoaded,setIsLoaded]=useState(false);

  //my api call to fetch links information
  useEffect(() => {
    getLinkInfo();
  }, []);
  async function getLinkInfo() {
    const data = await fetch(
      baseURL+"/note/"+id,{
        method:'GET',
        headers:{
            "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
        }
      }
    );
    const json = await data.text();
    console.log(json)
    setLinkInfo(json);
    setIsLoaded(true);
  };


   //function to delete the particular link
   function deleteData(){
    fetch(baseURL+"/note/"+id,{
        method:'DELETE', 
        headers:{
            "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
        }
    })
    .then((response)=>{
        if(response.status===200){
            // console.log("SUCCESS");
            // dispatch(setLink("Link sent to bin."))
            // dispatch(setReduxTrigger(true));      //to trigger popup of SUCCESS on main page
            navigate("/home");
            return response.json();
        }
        else{
            // dispatch(setLink("Kindly go to home page and refresh it."))
            // dispatch(setReduxTrigger(true));   //to trigger popup of something went wrong
            return 0;
        }
    })
  }







  return (
    <>
        {/* my header component    */}
        <>
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between">
        <Link to="/home" className="text-sm mx-4 pt-3 px-2 font-extralight text-[#FCFCFC] hover:bg-[#4C525F] hover:rounded-md hover:text-white hover:cursor-pointer"><span>Close</span></Link>
        <span className="text-sm mx-4 pt-3 px-2 font-extralight	 text-[#FCFCFC] hover:cursor-pointer">View link</span>
        <span className="text-sm mx-4 pt-3 px-2 font-extralight text-[#2F353D] hover:cursor-default	">Edit</span>
        </div>
       </>
       
       {isLoaded?(
           <>
              {/* my body component */}
             <>
                <div className="flex justify-center">
                    {/* <span className="bg-white">{linkInfo.link}</span> */}
                    {/* <input type="text" value={linkInfo.link} className="bg-[#3C434E] p-2  text-white"/> */}
                    <textarea rows={6} disabled={true} value={linkInfo} className="bg-[#2F353D] mt-7 p-2 w-[97%] rounded-md hover:bg-[#4C525F] text-sm font-light text-white focus:outline-none focus:bg-[#4C525F] hover:cursor-text "/>
                </div>
             </>
        
        
              {/* my delete button */}
              <>
                 <div onClick={()=>{deleteData();}} id="buttonClicked" className="bg-[#2F353D] text-[#FD8C85] w-[97%] h-[2.9rem] mt-[5%] p-2 rounded-md hover:bg-[#4C525F] hover:text-[#fa7c73] hover:cursor-pointer flex ml-auto mr-auto text-sm font-normal tracking-wide ">
                    <img src={trashUrl}/><span className="pt-1.5 pl-2">Delete item</span>
                 </div>
              </>
        
             
            </>
       ):(<InfoPageShimmer/>)}



    </>
   
    
  )
}

export default ViewLinkScreen