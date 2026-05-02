import React, { createContext, useState, useContext } from 'react';

const QuickViewContext = createContext();

export const QuickViewProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <QuickViewContext.Provider value={{ selectedProduct, isModalOpen, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};
