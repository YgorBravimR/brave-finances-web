import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ModalContextType {
  openModal: boolean
  handleCloseModal: () => void
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

interface ModalContextProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext({} as ModalContextType)

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <ModalContext.Provider value={{ openModal, handleCloseModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  )
}
