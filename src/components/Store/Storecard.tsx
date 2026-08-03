import { FaLocationDot } from "react-icons/fa6";
import { MdStorefront } from "react-icons/md";
import type { StoreModel } from "../../model/StoreModel";

interface StorecardProps {
  store: StoreModel;
  onViewDetail: (id: string) => void;
  onViewProducts: (id: string) => void;
}

const Storecard = ({ store, onViewDetail, onViewProducts }: StorecardProps) => {

  return (
    <div className="w-full rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="w-full h-full flex flex-col gap-2">
        <div
          className="flex rounded-[10px] gap-2 p-2"
          style={{ backgroundColor: store.color }}
        >
          <div
            className="p-3 rounded-[10px]"
            style={{ backgroundColor: `${store.color}CC` }}
          >
            <MdStorefront color="#041F23" size={25} />
          </div>

          <div className="flex flex-col">
            <span className="font-medium">{store.name}</span>
            <span className="text-[13px]">{store.type}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaLocationDot />
              <span>{store.location}</span>
            </div>

            <div className="px-3 bg-[#9ECCA1] rounded-[10px]">
              <span className="text-[12px] font-bold text-green-950">
                OPEN
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span>Total Products: {store.productQuantity || 0}</span>
            <span>Total Boughts: ₱{store.totalBought || 0}</span>
          </div>

          <div className="flex gap-2">
            <button 
            className="flex-[1.5] rounded-[10px] py-1 bg-[#68858B]"
            onClick={() => onViewDetail(store.id) }
            >
              View Details
            </button>

            <button 
            className="flex-1 rounded-[10px] py-1 bg-[#C4CECF]"
            onClick={() => onViewProducts(store.id)}>
              Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storecard;