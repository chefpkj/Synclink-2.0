import React,{ useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import GenericModal from "./GenericModal";
// import { useDispatch } from "react-redux";
// import { setReduxTrigger,setLink } from "../utils/triggerSlice";
import QRCode from "react-qr-code";


const NotesCard=({link,linkId })=>{    
    // const dispatch=useDispatch();

    const [showButton,setShowButton]=useState(false);
    const [handleModule,setHandleModule]=useState(false);
    const navigate=useNavigate();

    const handleShowModal=()=>{
        setHandleModule(!handleModule);
    }

    return (
        <div id="NotesCard" onMouseOver={()=>setShowButton(true)}
         onMouseLeave={()=>setShowButton(false)} onDoubleClick={()=>{navigator.clipboard.writeText(link?.note).then(() => {
            // invoked if the data is copied
            // dispatch(setLink("Copied."));     
            // dispatch(setReduxTrigger(true));        //to trigger popup of something went wrong 
            console.log("some redux actions dispatched!!")
            },
            () => {
            // handle data copy error
            alert("Copying failed")
            }
           )}}
          className="bg-[#2F353D] h-[2.9rem] mt-2 mx-1 p-2 rounded-md hover:bg-[#4C525F] hover:text-white hover:cursor-pointer flex flex-row items-center">            
        <span className="text-sm font-normal tracking-wide">{(link?.note.length>33)?(link?.note?.slice(0,33)+"..."):(link?.note)}</span>
        {/* {(showButton?(<EditButton linkId={linkId}/>):(""))} */}
        <div className="ml-auto mr-5 flex gap-2">

           <div onClick={()=>{
            navigate(`/viewLink/${link?._id}`);
           }} className=" p-1 rounded-lg  bg-[#2F353D] hover:cursor-pointer hover:bg-[#3C434E]">
           <svg className="svg-icon" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M910.001131 462.105636c-50.550303-78.533634-113.946168-137.2622-190.178387-176.187745 20.315698 34.624589 30.472012 72.059176 30.472012 112.305809 0 61.540611-21.8701 114.200972-65.608254 157.982104-43.73713 43.781132-96.398514 65.650209-157.981081 65.606207-61.582567-0.041956-114.243951-21.910009-157.981081-65.606207-43.738154-43.695175-65.60723-96.356558-65.60723-157.982104 0-40.245609 10.158361-77.68122 30.470989-112.305809-76.190263 38.925544-139.583059 97.655134-190.178387 176.187745 44.249807 68.225871 99.719142 122.54808 166.414147 162.964582 66.692958 40.415478 138.985448 60.623729 216.879516 60.623729s150.187581-20.208251 216.880539-60.623729C810.280966 584.653717 865.752348 530.331507 910.001131 462.105636L910.001131 462.105636zM550.662043 270.458805c0-6.643304-2.321882-12.307304-6.962575-16.991999-4.641717-4.684696-10.30674-7.005554-16.991999-6.963599-41.608653 0-77.298504 14.885012-107.067504 44.654013-29.770024 29.769001-44.654013 65.457828-44.654013 107.066481 0 6.644327 2.320858 12.307304 6.963599 16.993023 4.64274 4.683672 10.30674 7.007601 16.991999 6.964622s12.349259-2.366907 16.991999-6.964622c4.641717-4.599761 6.963599-10.264784 6.963599-16.993023 0-28.619828 10.158361-53.064566 30.472012-73.337285s44.760436-30.429033 73.337285-30.472012c6.643304 0 12.308327-2.320858 16.991999-6.962575C548.385187 282.809087 550.705022 277.145088 550.662043 270.458805zM973.885114 462.105636c0 11.328-3.321652 22.805402-9.965979 34.431184-46.591131 76.531024-109.216447 137.837298-187.877995 183.9178-78.661547 46.079478-161.750941 69.121264-249.27125 69.12024-87.518263 0-170.609703-23.125697-249.269203-69.376067C198.841186 633.95047 136.214846 572.730153 89.623715 496.538867c-6.644327-11.626805-9.965979-23.104207-9.965979-34.432207s3.321652-22.805402 9.965979-34.432207c46.591131-76.191286 109.217471-137.411603 187.879018-183.661973 78.659501-46.251394 161.749918-69.376067 249.269203-69.376067s170.609703 23.125697 249.27125 69.376067c78.659501 46.25037 141.284817 107.470687 187.877995 183.661973C970.563462 439.300234 973.885114 450.777637 973.885114 462.105636z"  /></svg>
           </div>


           <div onClick={()=>{
            navigator.clipboard.writeText(link?.note);
           }} className=" p-1 rounded-lg  bg-[#2F353D] hover:cursor-pointer hover:bg-[#3C434E]">
           <svg className="svg-icon" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M640 960 192 960C160 960 128 934.4 128 896L128 320C128 281.6 160 256 192 256L192 192C121.6 192 64 249.6 64 320L64 896C64 966.4 121.6 1024 192 1024L640 1024C710.4 1024 768 966.4 768 896L704 896C704 928 672 960 640 960ZM704 0 384 0C313.6 0 256 57.6 256 128L256 704C256 774.4 313.6 832 384 832L832 832C902.4 832 960 774.4 960 704L960 256 704 0ZM608 768 352 768C332.8 768 320 755.2 320 736 320 716.8 332.8 704 352 704L608 704C627.2 704 640 716.8 640 736 640 755.2 627.2 768 608 768ZM800 640 352 640C332.8 640 320 627.2 320 608 320 588.8 332.8 576 352 576L800 576C819.2 576 832 588.8 832 608 832 627.2 819.2 640 800 640ZM800 512 352 512C332.8 512 320 499.2 320 480 320 460.8 332.8 448 352 448L800 448C819.2 448 832 460.8 832 480 832 499.2 819.2 512 800 512ZM704 256 704 96 864 256 704 256Z"  /></svg>         
           </div>

           <div onClick={handleShowModal} className=" p-1 rounded-lg  bg-[#2F353D] hover:cursor-pointer hover:bg-[#3C434E]">
           <svg className="svg-icon" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M192 384l128 0L320 256 192 256 192 384zM64 960l384 0L448 576 64 576 64 960zM128 640l256 0 0 256L128 896 128 640zM192 832l128 0 0-128L192 704 192 832zM512 128l0 384 384 0L896 128 512 128zM832 448 576 448 576 192l256 0L832 448zM832 704l-128 0L704 576 576 576 512 576l0 128 0 256 64 0 0-256 64 0 0 64 192 0 64 0L896 576l-64 0L832 704zM64 512l384 0L448 128 64 128 64 512zM128 192l256 0 0 256L128 448 128 192zM768 256l-128 0 0 128 128 0L768 256zM832 960l64 0 0-128-64 0L832 960zM704 960l64 0 0-128-64 0L704 960z"  /></svg>
           </div> 

        </div>


   

      {(handleModule)&&<GenericModal 
     open={handleModule}
     title="QR Code"
     caption={"Scan below QR to get your link"}
     onClose={handleShowModal}
     style={{ maxHeight: '85%',  maxWidth: '80%' }}
     content={
      
        <QRCode value={link?.note} />
     
     }
    />}

       
        </div>
    );
}
export default NotesCard;






