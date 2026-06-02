import { FaBoxOpen } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
const QuicksStats = () => {
  return (
    <div>
      <div>
       <span className="text-[15px] text-black font-medium">Quick stats</span>
      </div>
      <div className="flex gap-2">
        <div className='flex flex-col gap-2 w-full max-w-44 h-auto p-3.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center justify-center w-7.5 h-7.5 bg-[#FFF3CC] rounded-lg'>
            <FaBoxOpen size={15} className='text-[#7A5E00]'/>
          </div>
          <span>9</span>
          <span className='text-[12px] text-[#9999B0]'>Added Products Today</span>
        </div>
        <div className='flex flex-col gap-2 w-full max-w-44 h-auto p-3.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center justify-center w-7.5 h-7.5 bg-[#FFF3CC] rounded-lg'>
            <IoMdCart size={15} className='text-[#7A5E00]'/>
          </div>
          <span>9</span>
          <span className='text-[12px] text-[#9999B0]'>Items Bought Today</span>
        </div>
      </div>
    </div>
  )
}

export default QuicksStats
