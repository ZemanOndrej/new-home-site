import React, { ReactNode, useEffect, useState } from 'react';

interface Modal {
  show: boolean;
  modal: () => null | JSX.Element;
  toggle: () => void;
  setShow: (value: boolean) => void;
  hideModal: () => void;
  openModal: (render: (closeModal: () => void) => JSX.Element) => void;
}

export const defaultSettings = {
  show: false,
  modal: () => null,
  toggle: () => null,
  setShow: () => null,
  hideModal: () => null,
  openModal: () => null,
};

const ModalContext = React.createContext<Modal>(defaultSettings);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<null | JSX.Element>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <ModalContext.Provider
      value={{
        show,
        modal: () => {
          return show ? modal : null;
        },
        setShow,
        toggle: () => setShow(!show),
        hideModal: () => setShow(false),
        openModal: (modal: (close: () => void) => JSX.Element) => {
          setShow(true);
          setModal(
            <div className="modal-overlay">{modal(() => setShow(false))}</div>,
          );
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;

export default ModalContext;
