import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { MainShimmer } from './components/Shimmer';
import NotesCard from './components/NotesCard';
import { baseURL } from '../config/constants';


function doFilter(searchTxt,allLinks){

  console.log("clicked!!")
  return allLinks.filter((link) =>
  link?.toLowerCase()?.includes(searchTxt?.toLowerCase()));
}


const HomePageScreen=()=>{

   // all state variables    
   const [searchTxt,SetSearchTxt]=useState("");
   const [filterData,setFilterData]=useState([]);
   const [allData,setAllData]=useState([]);
   const [isLoaded,setIsLoaded]=useState(false);


   // my api call
   useEffect(() => {
    getLinks();
  }, []);
  async function getLinks() {
    const data = await fetch(
      baseURL+"/notes",{
        method:'GET',
        headers:{
            "x-auth-token":localStorage.getItem("synclink_x-auth-token"),
        }
      }
    );
    
    const json = await data.json();
    
    setFilterData(json);
    setAllData(json);
    setIsLoaded(true);
  };


   return (
    <>
     {/* my Header component */}
     <>
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between">
        <span className="text-xl mx-3 mt-2 font-extralight	 text-[#FCFCFC]"><a href="/">Synclink.</a></span>
        {/* my search component */}
        <>
        <input type="text" value={searchTxt} onChange={(e)=>{SetSearchTxt(e.target.value)}} onKeyDown={(e) => {
              if(e.key == "Enter"){
                setFilterData(doFilter(e.target.value,allData));
              }   
              }} placeholder="Search type" className="grow m-2 bg-[#3C434E] p-2 text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]" />
        </>      
        <Link to="/addLink" className="text-4xl mx-3 px-2 font-thin text-[#FCFCFC] hover:bg-[#4C525F] hover:cursor-pointer hover:rounded-md"><span>+</span></Link>
        </div>
     </>

     {/* my body component  */}
     <>
        {isLoaded?
        (< div className="text-white"> {filterData?.map((rest,index) =>  <NotesCard key={index} link={rest} linkId={index}/>)}</div> ):
        (
            <MainShimmer/>
        )}
     </>



    </>
    
   
    
  )
 
 

}


export default HomePageScreen