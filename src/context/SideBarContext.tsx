import {createContext, useContext, useState, type ReactNode} from "react";

interface SideBarContextType {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContext = createContext<SideBarContextType | null>(null);

export const SideBarProvider = ({children}: {children: ReactNode}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <SideBarContext.Provider value={{isShow, setIsShow}}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(SideBarContext);

 if(!context) {
  throw new Error("useSideBar must be used inside MenuProvider");
 }

 return context;
}