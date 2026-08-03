import { useState } from "react";
import AddStore from "../components/Store/AddStore";
import StoreList from "../components/Store/StoreList";
import AddingStore from "../components/modal/AddingStore";
import StoreViewDetails from "../components/modal/StoreViewDetails";
import ProductList from "../components/modal/ProductList";
import AddingProduct from "../components/modal/AddingProduct";
import { useStore } from "../context/StoreContext";

const Store = () => {
  const { stores } = useStore();
  const [isshow, setIsShow] = useState(false);
  const [details, setDetails] = useState(false);
  const [products, setProducts] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false)
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  
  
  const viewDetailButton = (id: string) => {
    setSelectedStoreId(id);
    setDetails(true);
    console.log(stores)
    console.log("View Detail product modal opened");
  };

  const viewProductButton = (id: string) => {
    setSelectedStoreId(id);
    setProducts(true)
    console.log("View Product modal opened");
  }

    const addingProductButton = (id: string) => {
    setSelectedStoreId(id);
    setAddingProduct(true)
    console.log("Adding Product modal opened");
    
  }

  return (
    <div className="relative">
      <StoreList onViewDetail={viewDetailButton} onViewProducts={viewProductButton}/>
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

      {products && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
        <ProductList
          storeId={selectedStoreId}
          addingProduct={addingProductButton}
          onClose={() => setProducts(false)}
        />
        </div>
      )}

      {addingProduct && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
        <AddingProduct
          storeId={selectedStoreId}
          onClose={() => setAddingProduct(false)}
        />
        </div>
      )}

    </div>
  );
};

export default Store;