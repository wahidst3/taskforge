import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListsOverview from './ListOverviews';
import Hero from './Hero';
import { extractListFromParagraph } from "../utilis/gemini";
import TrustBadges from './Badge';
import HowItWorks from './Howitworks';
import AboutSection from './About';
import AppFooter from './Footer';
import GlassNavbar from './Nav';
import Feedback from './Feedback';
import { ToastContainer, toast } from 'react-toastify';
import { useLists } from '../utilis/ContextList';

const Home = () => {
  const { lists, setLists, loading: listsLoading } = useLists();
  const [loading, setLoading] = useState(false);
  const listref = useRef(null);
  const location = useLocation();

  const notify = () =>
    toast("Task list generated successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  useEffect(() => {
    if (location.state?.scrollTo === "hero") {
      setTimeout(() => {
        const el = document.getElementById("hero");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState({}, document.title);
        }
      }, 200);
    }
  }, [location]);

  async function handleGenerate(paragraph) {
    try {
      setLoading(true);
      const fresh = await extractListFromParagraph(paragraph);
      console.log('Extracted lists:', fresh);

      // Merge new items with current lists from context
      setLists(prev => [...prev, ...fresh]);

      setLoading(false);
      notify();

      setTimeout(() => {
        if (listref.current) {
          listref.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      <GlassNavbar />
      <Hero onGenerate={handleGenerate} isLoading={loading} />
      <ListsOverview
        lists={lists}
        setLists={setLists}
        isloading={loading || listsLoading}
        ref={listref}
      />
      <TrustBadges />
      <HowItWorks />
      <AboutSection />
      <Feedback />
      <AppFooter />
    </div>
  );
};

export default Home;
