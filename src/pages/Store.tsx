import { useState } from "react";
import AddStore from "../components/Store/AddStore";
import StoreList from "../components/Store/StoreList";
import AddingStore from "../components/modal/AddingStore";
import StoreViewDetails from "../components/modal/StoreViewDetails";

const Store = () => {
  const [isshow, setIsShow] = useState(false)
  const [details, setDetails] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const viewDetailButton = (id: string) => {
    setSelectedStoreId(id);
    setDetails(true);
  };

  return (
    <div className="relative">
      <StoreList onViewDetail={viewDetailButton} />
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

      {details && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
        <StoreViewDetails
          storeId={selectedStoreId}
          onClose={() => setDetails(false)}
        />
        </div>
      )}

    </div>
  );
};

export default Store;