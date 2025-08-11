import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import ListsOverview from "./components/ListOverviews";
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import BoardPage from "./components/Board.jsx";
import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx';
import FeaturesPage from './components/Features.jsx'
import PricingPage from './components/Pricing.jsx'
import ScrollToTop from './components/Scroll.jsx'
import ContactPage from './components/Contact.jsx'

function App() {

  

  return (
    <>
<div className=' w-full h-full '>
  {/* <ToastContainer /> */}

<ScrollToTop/>
  <Routes>
    
     <Route path="/" element={ <Home/>} />
     <Route path="/ds" element={ <Dashboard/>} />
     <Route path="/features" element={ <FeaturesPage/>} />
     <Route path="/contact" element={ <ContactPage/>} />
     <Route path="/pricing" element={ <PricingPage/>} />
     <Route path="/board/:listId" element={<BoardPage />} />
    </Routes>
  </div>   

 </>
  )
}

export default App
