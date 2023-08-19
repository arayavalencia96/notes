import React, { createContext, useContext, useState } from "react";
import { type RouterOutputs } from "~/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][0];

interface SelectedTopicContextType {
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
}

const SelectedTopicContext = createContext<
  SelectedTopicContextType | undefined
>(undefined);

export const SelectedTopicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <SelectedTopicContext.Provider
      value={{
        selectedTopicId,
        setSelectedTopicId,
        selectedTopic,
        setSelectedTopic,
      }}
    >
      {children}
    </SelectedTopicContext.Provider>
  );
};

export const useSelectedTopic = () => {
  const context = useContext(SelectedTopicContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedTopic must be used within a SelectedTopicProvider"
    );
  }
  return context;
};
