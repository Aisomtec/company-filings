import React, { createContext, useContext, useState } from "react";

const ConsultationContext = createContext(null);

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error("useConsultation must be used within a ConsultationProvider");
  }
  return context;
};

export const ConsultationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState("");

  const openModal = (category = "") => {
    setDefaultCategory(category);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ConsultationContext.Provider value={{ isOpen, openModal, closeModal, defaultCategory }}>
      {children}
    </ConsultationContext.Provider>
  );
};
