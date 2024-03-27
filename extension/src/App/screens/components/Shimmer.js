import NotesCard from "./NotesCard"
import React from "react"
// import { trashUrl } from "../constants"


export const MainShimmer=()=>{

    return (
        <div className="">
        {Array.from({length:9},(_, index)=>{
            return (
                <div className="animate-pulse"  key={index}><NotesCard/></div>
            )
        })}  
        </div>
    )
}

export const InfoPageShimmer=()=>{
    return (
        <>
        {/* my body component */}
        <>
        <div className="flex justify-center">
            <textarea rows={6} disabled={true} className="bg-[#2F353D] animate-pulse mt-7 p-2 w-[97%] rounded-md hover:bg-[#4C525F] text-sm font-light text-white focus:outline-none focus:bg-[#4C525F] hover:cursor-text "/>
        </div>
        </>


      {/* my delete button */}
      <>
         <div className="bg-[#2F353D] animate-pulse text-[#FD8C85] w-[97%] h-[2.9rem] mt-[5%] p-2 rounded-md hover:bg-[#4C525F] hover:text-[#fa7c73] hover:cursor-pointer flex ml-auto mr-auto text-sm font-normal tracking-wide ">
            <img src={"https://img.icons8.com/ios/50/fa7c73/trash--v1.png"}/><span className="pt-1.5 pl-2">Delete item</span>
         </div>
      </>

      </>  
    )
}

