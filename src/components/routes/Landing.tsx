import About from 'components/landingPage/About';
import Contact from 'components/landingPage/Contact';
import Footer from 'components/landingPage/Footer';
import Header from 'components/landingPage/Header';
import Portfolio from 'components/landingPage/Portfolio';
import Resume from 'components/landingPage/Resume';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/database';
import { MainPageContent } from 'types/mainPage';
import 'styles/landing.css';
import useSettings from 'components/hooks/useSettings';
import SidebarContainer from 'components/Sidebar/SidebarContainer';
import ModalContext from 'components/context/modal';
import Loader from 'components/common/Loader';
import { getDatabase, ref, onValue } from 'firebase/database';
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

  const { openModal, setShow, modal } = useContext(ModalContext);
  useEffect(() => {
    openModal(() => <Loader />);
    const db = getDatabase(fb);
    const mainPageContent = ref(db, 'main-page-content');
    onValue(mainPageContent, (snapshot) => {
      const data = snapshot.val();
      setResumeData(data);
      setShow(false);
    });
  }, []);

  const [waypoint, setWaypoint] = useState(LANDING_WP.HOME);
  const setWaypointCallback = useCallback(setWaypoint, []);

  return (
    <div>
      {modal()}
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
            {/* <Testimonials
              setWaypoint={setWaypointCallback}
              data={resumeData.testimonials}
            /> */}
            <Contact setWaypoint={setWaypointCallback} data={resumeData.main} />
            <Footer data={resumeData.main} />
          </div>
        </>
      )}
    </div>
  );
}
