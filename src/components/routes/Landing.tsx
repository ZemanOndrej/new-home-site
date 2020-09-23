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
import { Waypoint } from 'react-waypoint';

export default function Landing() {
  const [resumeData, setResumeData] = useState<MainPageContent | null>();
  const fb = useContext(FirebaseContext);
  const db = fb?.database();
  useEffect(() => {
    db?.ref('main-page-content').on('value', (snapshot) => {
      const data = snapshot.val();
      setResumeData(data);
    });
  }, []);

  const [waypoint, setWaypoint] = useState('home');
  return (
    <div>
      {resumeData && (
        <>
          <Header
            setWaypoint={() => setWaypoint('home')}
            waypoint={waypoint}
            data={resumeData.main}
          />
          <About
            setWaypoint={() => setWaypoint('about')}
            data={resumeData.main}
          />
          <Resume
            setWaypoint={() => setWaypoint('resume')}
            data={resumeData.resume}
          />
          <Portfolio
            setWaypoint={() => setWaypoint('portfolio')}
            data={resumeData.portfolio}
          />
          <Testimonials
            setWaypoint={() => setWaypoint('testimonials')}
            data={resumeData.testimonials}
          />
          <Contact
            setWaypoint={() => setWaypoint('contact')}
            data={resumeData.main}
          />
          <Footer data={resumeData.main} />
        </>
      )}
    </div>
  );
}
