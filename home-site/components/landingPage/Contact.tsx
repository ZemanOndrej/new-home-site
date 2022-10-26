import React, { useRef, MouseEvent, useContext } from 'react';
import { Waypoint } from 'react-waypoint';
import { useState } from 'react';
import { Main } from 'types/mainPage';
import { getEmailStatus, saveEmailStatus, sendEmail } from 'service/email';
import ModalContext from 'components/context/modal';
import Loader from 'components/common/Loader';
import { ErrorModal, SuccessModal } from 'components/common/Modals';
import { APP_NAME, LANDING_WP } from 'consts';

interface Props {
  data: Main;
  setWaypoint: (wp: LANDING_WP) => void;
}

function Contact({
  data: {
    name,
    address: { street, zip, state, city },
    phone,
    contactmessage: message,
  },
  setWaypoint,
}: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const subRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { openModal } = useContext(ModalContext);

  const [isSubmitted, setIsSubmitted] = useState(Boolean(getEmailStatus()));
  const [error, setError] = useState<string | null>();

  const onSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!isSubmitted) {
      const emailData = {
        email: emailRef.current?.value || '',
        message: textRef.current?.value || '',
        subject: subRef.current?.value || '',
        name: contactRef.current?.value || '',
        appInfo: APP_NAME,
      };
      console.log(emailData);
      if (
        emailData.email.length > 0 &&
        emailData.subject.length > 0 &&
        emailData.message.length > 0 &&
        emailData.name.length > 0
      ) {
        openModal(() => <Loader />);

        sendEmail(emailData)
          .then((res) => {
            console.log(res);
            openModal<void>((closeModal) => (
              <SuccessModal
                message="Email was sent successfully."
                handleClose={closeModal}
              />
            ))?.then(() => {
              setIsSubmitted(true);
              saveEmailStatus(new Date());
            });
          })
          .catch((e) => {
            console.error(e);
            openModal<void>((closeModal) => (
              <ErrorModal
                message="Email was not sent."
                handleClose={closeModal}
              />
            ))?.then(() =>
              setError('An error ocurred please try again later.'),
            );
          });
      } else {
        setError('Please fill all required fields');
      }
    }
  };

  return (
    <Waypoint onEnter={() => setWaypoint(LANDING_WP.CONTACT)}>
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>

        <div className="row">
          <div className="eight columns">
            <form action="" method="post" id="contactForm" name="contactForm">
              <fieldset>
                {!isSubmitted && (
                  <>
                    <div>
                      <label htmlFor="contactName">
                        Name <span className="required">*</span>
                      </label>
                      <input
                        className="inp"
                        type="text"
                        defaultValue=""
                        size={35}
                        id="contactName"
                        name="contactName"
                        ref={contactRef}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactEmail">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        className="inp"
                        type="text"
                        defaultValue=""
                        size={35}
                        id="contactEmail"
                        name="contactEmail"
                        ref={emailRef}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactSubject">
                        Subject<span className="required">*</span>
                      </label>
                      <input
                        className="inp"
                        type="text"
                        defaultValue=""
                        size={35}
                        id="contactSubject"
                        name="contactSubject"
                        ref={subRef}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactMessage">
                        Message <span className="required">*</span>
                      </label>
                      <textarea
                        cols={50}
                        rows={15}
                        id="contactMessage"
                        name="contactMessage"
                        ref={textRef}
                      ></textarea>
                    </div>
                  </>
                )}

                {error && <div id="message-warning"> {error}</div>}
                {isSubmitted && (
                  <div id="message-success">
                    <i className="fa fa-check"></i>Your message was sent, thank
                    you!
                    <br />
                  </div>
                )}
                {!isSubmitted && (
                  <div>
                    <button className="submit" onClick={onSubmit}>
                      Submit
                    </button>
                  </div>
                )}
              </fieldset>
            </form>
          </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state} {zip}
                <br />
                {phone}
              </p>
            </div>

            {/* <div className="widget widget_tweets">
              <h4 className="widget-title">Latest Tweets</h4>
              <ul id="twitter">
                <li>
                  <span>
                    This is Photoshop&apos;s version of Lorem Ipsum. Proin
                    gravida nibh vel velit auctor aliquet. Aenean sollicitudin,
                    lorem quis bibendum auctor, nisi elit consequat ipsum
                    <a href="#">http://t.co/CGIrdxIlI3</a>
                  </span>
                  <b>
                    <a href="#">2 Days Ago</a>
                  </b>
                </li>
                <li>
                  <span>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi
                    <a href="#">http://t.co/CGIrdxIlI3</a>
                  </span>
                  <b>
                    <a href="#">3 Days Ago</a>
                  </b>
                </li>
              </ul>
            </div> */}
          </aside>
        </div>
      </section>
    </Waypoint>
  );
}

export default Contact;
