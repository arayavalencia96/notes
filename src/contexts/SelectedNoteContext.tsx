import { type Note } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";

const InitialValues: Note = {
    content: '',
    createdAt: new Date(),
    id: '',
    title: '',
    topicId: '',
    updatedAt: new Date(),  
  };

interface SelectedNoteContextType {
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  isEdit: boolean | null;
  setIsEdit: (set: boolean | null) => void;
}

const SelectedNoteContext = createContext<
  SelectedNoteContextType | undefined
>(undefined);

export const SelectedNoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(InitialValues);
  const [isEdit, setIsEdit] = useState<boolean | null>(false);

  return (
    <SelectedNoteContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </SelectedNoteContext.Provider>
  );
};

export const useSelectedNote = () => {
  const context = useContext(SelectedNoteContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedNote must be used within a SelectedNoteProvider"
    );
  }
  return context;
};
