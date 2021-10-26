import { createContext, useContext, useState, useEffect } from "react";

const ViewportContext = createContext({});

export const useViewport = () => {
  const { width } = useContext(ViewportContext);
  return { width };
};

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width }}>
      {children}
    </ViewportContext.Provider>
  );
};
