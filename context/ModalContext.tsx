"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, content, openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {isOpen && content && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
