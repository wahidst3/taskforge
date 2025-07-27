import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
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

const Home = () => {
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists') )|| []);
    const [loading, setLoading] = useState(false);
    
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
        setLoading(false);                                        // re-render
      } catch (e) {
        console.error(e);
      }
    }
  return (
    <div>
      <GlassNavbar/>
       <Hero onGenerate={handleGenerate} />;
      <TrustBadges/>
 <ListsOverview lists={lists} setLists={setLists } isloading={loading}/>
 <HowItWorks/>
 <AboutSection/>
 <Feedback/>
 <AppFooter/>
    </div>
  )
}

export default Home
