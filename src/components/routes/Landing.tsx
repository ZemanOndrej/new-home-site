import About from 'components/landingPage/About';
import Contact from 'components/landingPage/Contact';
import Footer from 'components/landingPage/Footer';
import Header from 'components/landingPage/Header';
import Portfolio from 'components/landingPage/Portfolio';
import Resume from 'components/landingPage/Resume';
import Testimonials from 'components/landingPage/Testimonials';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/database';
import { MainPageContent } from 'types/mainPage';
import 'styles/landing.css';
import { FadeLoader } from 'react-spinners';
import useSettings from 'components/hooks/useSettings';
import Sidebar from 'components/landingPage/Sidebar';
export enum LANDING_WP {
  HOME = 'home',
  ABOUT = 'about',
  RESUME = 'resume',
  PORTFOLIO = 'portfolio',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
}

export default function Landing() {
  const [resumeData, setResumeData] = useState<MainPageContent | null>();
  const fb = useContext(FirebaseContext);
  const db = fb?.database();
  const { changeIsEditing, isEditing } = useSettings();

  useEffect(() => {
    db?.ref('main-page-content').on('value', (snapshot) => {
      const data = snapshot.val();
      setResumeData(data);
    });
  }, []);

  const [waypoint, setWaypoint] = useState(LANDING_WP.HOME);
  return (
    <div>
      {!resumeData && (
        <div className="loader-overlay">
          <FadeLoader color={'#ffffff'} loading={!resumeData} />
        </div>
      )}
      {resumeData && (
        <>
          {isEditing || (true && <Sidebar data={resumeData}></Sidebar>)}
          <div>
            <Header
              setWaypoint={() => setWaypoint(LANDING_WP.HOME)}
              waypoint={waypoint}
              data={resumeData.main}
            />
            <About
              setWaypoint={() => setWaypoint(LANDING_WP.ABOUT)}
              data={resumeData.main}
            />
            <Resume
              setWaypoint={() => setWaypoint(LANDING_WP.RESUME)}
              data={resumeData.resume}
            />
            <Portfolio
              setWaypoint={() => setWaypoint(LANDING_WP.PORTFOLIO)}
              data={resumeData.portfolio}
            />
            <Testimonials
              setWaypoint={() => setWaypoint(LANDING_WP.TESTIMONIALS)}
              data={resumeData.testimonials}
            />
            <Contact
              setWaypoint={() => setWaypoint(LANDING_WP.CONTACT)}
              data={resumeData.main}
            />
            <Footer data={resumeData.main} />
          </div>
        </>
      )}
    </div>
  );
}
