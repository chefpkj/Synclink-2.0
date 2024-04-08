import React from "react";
import LoginScreen from "./App/screens/LoginScreen";
import HomePageScreen from "./App/screens/HomePageScreen";
import { Route, Routes,useLocation,Link } from "react-router-dom";
import AddLinkScreen from "./App/screens/AddLinkScreen";
import ViewLinkScreen from "./App/screens/ViewLinkScreen";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import SharedNotesScreen from "./App/screens/SharedNotesScreen";

const App = () => {

  const location=useLocation();

  return (
    <>
      <Routes>
        <Route path="viewLink/:id" element={<ViewLinkScreen />} />
        <Route path="addLink" element={<AddLinkScreen />} />
        <Route path="home" element={<HomePageScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="friends" element={<div className="text-white">friends</div>} />
        <Route path="shared" element={<SharedNotesScreen/>} />
        <Route path="settings" element={<div className="text-white">settings</div>} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>

      {}

      {/* my footer */}
      <>
      {/* <div>{location?.pathname}</div> */}
        <div className="bg-[#2F353D] h-[2.65rem] flex justify-between fixed bottom-0 w-full cursor-pointer">
         
          <Link to={"home"} style={{ color: location?.pathname==="/home"?("#6F9DF1"):("#BAC0CE") }} className="text-[#BAC0CE] justify-center flex-1 hover:bg-[#4C525F]">
            <div className="flex justify-center">
              <DescriptionIcon  />
            </div>
            <p className="text-center">Links</p>
          </Link>

          <Link to={"/shared"} style={{ color: location?.pathname==="/shared"?("#6F9DF1"):("#BAC0CE") }} className="text-[#BAC0CE] justify-center flex-1 hover:bg-[#4C525F]">
            <div className="flex justify-center">
              <FolderSharedIcon  />
            </div>
            <p className="text-center">Shared</p>
          </Link>

          <Link to={"/friends"} style={{ color: location?.pathname==="/friends"?("#6F9DF1"):("#BAC0CE") }} className="text-[#BAC0CE] justify-center flex-1 hover:bg-[#4C525F]">
            <div className="flex justify-center">
              <PeopleAltIcon  />
            </div>
            <p className="text-center">Friends</p>
          </Link>

          <Link to={"/settings"} style={{ color: location?.pathname==="/settings"?("#6F9DF1"):("#BAC0CE") }} className="text-[#BAC0CE] justify-center flex-1 hover:bg-[#4C525F]">
            <div className="flex justify-center">
              <SettingsIcon  />
            </div>
            <p className="text-center">Settings</p>
          </Link>

        </div>
      </>
    </>
  );
};

export default App;
