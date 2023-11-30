import React, { createContext, useContext, useState, useEffect } from "react";

const ClickedContext = createContext();

export const useClickedContext = () => {
  const context = useContext(ClickedContext);
  if (!context) {
    throw new Error("useClickedContext must be used within a ClickedProvider");
  }
  return context;
};

export const ClickedProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const [clickedFile, setClickedFile] = useState("");

  const toggleClicked = () => {
    const newClicked = !clicked;
    setClicked(newClicked);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("clicked", newClicked.toString());
    }
  };
  const updateClickedFile = (file) => {
    setClickedFile(file);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("clickedFile", file);
    }
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setClicked(localStorage.getItem("clicked") === "true");
      setClickedFile(localStorage.getItem("clickedFile") || "");
    }
  }, []);

  const contextValue = {
    clicked,
    toggleClicked,
    clickedFile,
    updateClickedFile,
  };

  return (
    <ClickedContext.Provider value={contextValue}>
      {children}
    </ClickedContext.Provider>
  );
};
