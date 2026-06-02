import { useContext, createContext, useState, type ReactNode } from "react";
import type { StoreModel } from "../model/StoreModel";

interface StoreContextModel {
  stores: StoreModel[];
  addStore: (store: StoreModel) => void
}

const StoreContext = createContext<StoreContextModel | null>(null);

export const StoreProvider = ({ children }: {children: ReactNode}) => {
  const [stores, setStores] = useState<StoreModel[]>([]);
  
  const addStore = (store: StoreModel) => {
    setStores((prev) => [...prev, store]) 
  }
  return(
  <>
    <StoreContext.Provider value={{stores, addStore}}>
      {children}
    </StoreContext.Provider>
  </>) 
}

export const useStore = () => {
  const context = useContext(StoreContext);

  if(!context) {
    throw Error ("useStore must be used inside StoreProvider")
  }
}