import { dateFormat } from "../../utils/date";
import Storecard from "./Storecard";
import { useStore } from "../../context/StoreContext";

interface StoreListProps {
  onViewDetail: (id: string) => void;
}

const StoreList = ({ onViewDetail }: StoreListProps) => {
  const { stores } = useStore();

  return (
    <div className="bg-[#F5F4F0] w-full h-screen">
      <div className="p-4">
        <div className="flex gap-1 items-center justify-between">
          <div className="flex gap-1">
            <span className="text-[12px] text-[#DFA700]">●</span>
            <span className="text-[12px] text-[#9999B0] font-medium">
              STORE
            </span>
          </div>

          <span className="text-[12px] text-[#9999B0]">
            {dateFormat()}
          </span>
        </div>

        <div className="mb-5">
          <h1 className="font-bold text-2xl">Store List:</h1>

          <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {stores.map((store, index) => (
              <Storecard
                key={index}
                store={store}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreList;