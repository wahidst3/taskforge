import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import ListsOverview from "./components/ListOverviews";

import { Routes, Route } from 'react-router-dom';

import BoardPage from "./components/Board.jsx";
import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx';
function App() {

  

  return (
    <>
<div className=' w-full h-full '>


  <Routes>
    
     <Route path="/" element={ <Home/>} />
     <Route path="/ds" element={ <Dashboard/>} />
     <Route path="/board/:listId" element={<BoardPage />} />
    </Routes>
  </div>   

 </>
  )
}

export default App
