import React, { ReactNode, useEffect, useState } from 'react';

interface Modal {
  show: boolean;
  modal: () => null | JSX.Element;
  toggle: () => void;
  setShow: (value: boolean) => void;
  hideModal: () => void;
  openModal: <T>(
    render: (closeModal: (param: T) => void) => JSX.Element,
  ) => Promise<T> | null;
}

export const defaultSettings = {
  show: false,
  modal: () => null,
  toggle: () => null,
  setShow: () => null,
  hideModal: () => null,
  openModal: () => null,
};

export enum ModalReturnStatus {
  Cancelled,
  OK,
}

export interface ModalResult<T> {
  status: ModalReturnStatus;
  data: T;
}

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
        openModal: <T,>(
          modal: (close: (param: T) => void) => JSX.Element,
        ): Promise<T> => {
          const promise = new Promise<T>((resolve) => {
            setShow(true);
            setModal(
              <div className="modal-overlay">
                {modal((param: T) => {
                  setShow(false);
                  resolve(param);
                })}
              </div>,
            );
          });
          return promise;
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;

export default ModalContext;
