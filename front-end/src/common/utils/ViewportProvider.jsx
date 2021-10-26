import { createContext, useContext, useState, useEffect } from "react";

const ViewportContext = createContext({});

export const useViewport = () => {
  const { width, height } = useContext(ViewportContext);
  return { width, height };
};

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width }}>
      {children}
    </ViewportContext.Provider>
  );
};
