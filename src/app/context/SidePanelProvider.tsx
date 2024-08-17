// context/SidePanelProvider.tsx
"use client";

import React, { useState, createContext, ReactNode, FC } from 'react';

interface SidePanelContextType {
  isOpen: boolean;
  profileUrl: string;
  setProfileUrl: (url: string) => void;
  togglePanel: () => void;
}

const SidePanelContext = createContext<SidePanelContextType | undefined>(undefined);

const SidePanelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [profileUrl, setProfileUrl] = useState<string>('');

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <SidePanelContext.Provider value={{ isOpen, togglePanel, profileUrl, setProfileUrl }}>
      {children}
    </SidePanelContext.Provider>
  );
};

export { SidePanelProvider, SidePanelContext };
