import { useState } from "react";
import AddStore from "../components/Store/AddStore";
import StoreList from "../components/Store/StoreList";
import AddingStore from "../components/modal/AddingStore";

const Store = () => {
  const [isshow, setIsShow] = useState(false)
  return (
    <div className="relative">
      <StoreList />
      <div onClick={() => setIsShow(!isshow)} className="absolute bottom-6 right-6">
        <AddStore />
      </div>

      {isshow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="mx-auto w-full max-h-[90vh] max-w-2xl overflow-y-hidden rounded-2xl">
            <AddingStore onClose={() => setIsShow(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;