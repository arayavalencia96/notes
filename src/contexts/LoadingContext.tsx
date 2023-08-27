import React, { createContext, useContext, useState } from "react";

interface IsBooleanContextType {
  isLoading: boolean | null;
  showLoading: () => void;
  hideLoading: () => void;
  sector: string | null;
  setSector: (sector: string) => void;
}

const LoadingContext = createContext<IsBooleanContextType | undefined>(
  undefined
);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sector, setSector] = useState("");

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, showLoading, hideLoading, sector, setSector }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
