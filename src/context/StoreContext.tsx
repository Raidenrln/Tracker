import { useContext, createContext, useState, type ReactNode } from "react";
import type { StoreModel } from "../model/StoreModel";
import type { ProductModel } from "../model/ProductModel";

interface StoreContextModel {
  stores: StoreModel[];
  addStore: (store: StoreModel) => void;
  addProduct: (storeId: string, product: ProductModel) => void;
}

const StoreContext = createContext<StoreContextModel | null>(null);

export const StoreProvider = ({ children }: {children: ReactNode}) => {
  const [stores, setStores] = useState<StoreModel[]>([]);
  
  const addStore = (store: StoreModel) => {
    setStores((prev) => [...prev, store]) 
  }

  const addProduct = (storeId: string, product: ProductModel) => {
  setStores(prev =>
    prev.map(store =>
      store.id === storeId
        ? {
            ...store,
            products: [...store.products, product],
          }
        : store
    )
  );
};
  return(
  <>
    <StoreContext.Provider value={{stores, addStore, addProduct}}>
      {children}
    </StoreContext.Provider>
  </>) 
}

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
};