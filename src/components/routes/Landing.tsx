import About from 'components/landingPage/About';
import Contact from 'components/landingPage/Contact';
import Footer from 'components/landingPage/Footer';
import Header from 'components/landingPage/Header';
import Portfolio from 'components/landingPage/Portfolio';
import Resume from 'components/landingPage/Resume';
import Testimonials from 'components/landingPage/Testimonials';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/database';
import { MainPageContent } from 'types/mainPage';
import 'styles/landing.css';
import { FadeLoader } from 'react-spinners';
import useSettings from 'components/hooks/useSettings';
import SidebarContainer from 'components/Sidebar/SidebarContainer';
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
  const { isEditing } = useSettings();

  useEffect(() => {
    const db = fb?.database();
    db?.ref('main-page-content').on('value', (snapshot) => {
      const data = snapshot.val();
      setResumeData(data);
    });
  }, []);

  const [waypoint, setWaypoint] = useState(LANDING_WP.HOME);
  const setWaypointCallback = useCallback(setWaypoint, []);

  return (
    <div>
      {!resumeData && (
        <div className="loader-overlay">
          <FadeLoader color={'#ffffff'} loading={!resumeData} />
        </div>
      )}
      {resumeData && (
        <>
          {isEditing && <SidebarContainer data={resumeData} />}
          <div>
            <Header
              setWaypoint={setWaypointCallback}
              waypoint={waypoint}
              data={resumeData.main}
            />
            <About setWaypoint={setWaypointCallback} data={resumeData.main} />
            <Resume
              setWaypoint={setWaypointCallback}
              data={resumeData.resume}
            />
            <Portfolio
              setWaypoint={setWaypointCallback}
              data={resumeData.portfolio}
            />
            <Testimonials
              setWaypoint={setWaypointCallback}
              data={resumeData.testimonials}
            />
            <Contact setWaypoint={setWaypointCallback} data={resumeData.main} />
            <Footer data={resumeData.main} />
          </div>
        </>
      )}
    </div>
  );
}
