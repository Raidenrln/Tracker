import { FaLocationDot } from "react-icons/fa6";
import { MdStorefront } from 'react-icons/md'
const Storecard = () => {
  return (
    <div className="max-w-60 h-auto rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex bg-[#648388] rounded-[10px] gap-2 p-2">
          <div className="p-3 bg-[#5B767B] rounded-[10px]">
            <MdStorefront color="#041F23" size={25}/>
          </div>
          <div className="flex flex-col"> 
            <span className="font-medium">Kuya Ric</span>
            <span className="text-[13px]">Near house</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaLocationDot/>
            <span>Muzon</span>
          </div>
          <div className="px-3 bg-[#9ECCA1] rounded-[10px]">
            <span className="text-[12px] font-bold text-green-950">OPEN</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Total Products: 8</span>
          <span>Total Boughts: ₱50</span>
        </div>
          <div className="flex gap-2">
            <button className="flex-[1.5] rounded-[10px] py-1 bg-[#68858B]">
              View Details
            </button>
            <button className="flex-1 rounded-[10px] py-1 bg-[#C4CECF]">
              Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Storecard
