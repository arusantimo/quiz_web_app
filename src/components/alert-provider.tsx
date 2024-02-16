// 모달 상태 관리 훅 만들기
import React, { useState, createContext, useContext, ReactNode } from "react";

type DialogContextType = {
  isOpen: boolean;
  content: string;
  openDialog: () => void;
  closeDialog: () => void;
  setContent: (text: string) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{
  children: ReactNode;
  defaultValue?: DialogContextType;
}> = ({ children, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(defaultValue?.isOpen ?? false);
  const [content, setContent] = useState(defaultValue?.content ?? "");
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const _setContent = (text: string) => setContent(text);

  return (
    <DialogContext.Provider
      value={{
        content,
        isOpen,
        openDialog,
        closeDialog,
        setContent: _setContent,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
