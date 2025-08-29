"use client";
import { useState, useCallback, ReactNode } from "react";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((modalContent?: ReactNode) => {
    if (modalContent) {
      setContent(modalContent);
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return { 
    isOpen, 
    content,
    openModal, 
    closeModal, 
    toggleModal 
  };
};
