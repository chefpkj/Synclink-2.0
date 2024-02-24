import React from 'react';
import LoginScreen from './App/screens/LoginScreen';
import HomePageScreen from './App/screens/HomePageScreen';
import { Route, Routes } from 'react-router-dom';
import AddLinkScreen from './App/screens/AddLinkScreen';
import ViewLinkScreen from './App/screens/ViewLinkScreen';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="viewLink" element={<ViewLinkScreen />} index />
        <Route path="addLink" element={<AddLinkScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="*" element={<HomePageScreen />} />
      </Routes>
    </>
  );
};

export default App;
