"use client";
import React, { createContext, useContext, useState } from "react";

// Create a context
const MapContext = createContext();

// Context provider
export const MapProvider = ({ children }) => {
  const [center, setCenter] = useState({lat: 0, lng: 0});

  return (
    <MapContext.Provider value={{ center, setCenter }}>
      {children}
    </MapContext.Provider>
  );
};

// Hook to use context
export const useMap = () => useContext(MapContext);
