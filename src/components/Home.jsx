import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import ListsOverview from './ListOverviews';
import { loadLists, saveLists } from "../utilis/storage";
import Hero from './Hero';
import { extractListFromParagraph } from "../utilis/gemini";
import { ClipLoader } from "react-spinners";
import TrustBadges from './Badge';
import HowItWorks from './Howitworks';
import AboutSection from './About';
import AppFooter from './Footer';
import GlassNavbar from './Nav';
import Feedback from './Feedback';
 import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists') )|| []);
    const [loading, setLoading] = useState(false);
    const listref = useRef(null);
    const location = useLocation();
    const notify = () => toast("Task list generated successfully!",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
useEffect(() => {
  console.log("Current location:", location.state);
  if (location.state?.scrollTo === "hero") {
    setTimeout(() => {
      const el = document.getElementById("hero");
      console.log("Scrolling to hero:", el);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // Clear location state after scroll
        window.history.replaceState({}, document.title);
      }
    }, 200); // 200ms to ensure DOM is ready
  }
    console.log("Current location:", location.state);
}, [location]);


    async function handleGenerate(paragraph) {
      try {
        setLoading(true);
        const fresh = await extractListFromParagraph(paragraph); 
        console.log('Extracted lists:', fresh);
        // array from Gemini
        const current = loadLists();                             // existing
        const updated = [...current, ...fresh];                  // merge
        saveLists(updated);                                      // persist
        setLists(updated);        
        setLoading(false); 
        notify();
      setTimeout(() => {
        if (listref.current) {
          listref.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // delay 100ms

       
                                       // re-render
      } catch (e) {
        console.error(e);
      }
    }
  return (
    <div>
        <ToastContainer />
      <GlassNavbar/>
      <div >       <Hero onGenerate={handleGenerate} isLoading={loading}  />;</div>

       <ListsOverview lists={lists} setLists={setLists } isloading={loading} ref={listref}/>
      <TrustBadges/>
 <HowItWorks/>
 <AboutSection/>
 <Feedback/>
 <AppFooter/>
    </div>
  )
}

export default Home
