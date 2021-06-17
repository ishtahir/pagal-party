import React, { useState, createContext, useRef, useContext } from 'react';
import Modal from '../../components/elements/Modal';

const ModalContext = createContext(Promise.reject);

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({ children }) => {
  const [modalState, setModalState] = useState(null);

  const awaitingPromiseRef = useRef();

  const openConfirmation = (options) => {
    setModalState(options);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (modalState.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setModalState(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setModalState(null);
  };

  return (
    <>
      <ModalContext.Provider value={openConfirmation} children={children} />

      <Modal
        show={Boolean(modalState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...modalState}
      />
    </>
  );
};
