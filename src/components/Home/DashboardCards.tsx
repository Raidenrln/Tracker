import { MdStorefront } from 'react-icons/md'
import { PiPackageDuotone } from 'react-icons/pi'
import { LuPhilippinePeso } from 'react-icons/lu'
import QuicksStats from "./QuicksStats"
import { dateFormat } from '../../utils/date'
const DashboardCards = () => {
  return (
    <div className="bg-[#F5F4F0] w-full h-screen">
      <div className="p-4"> 
        
        {/*Top bar*/}
        <div className="flex gap-1 items-center justify-between">
          <div className="flex gap-1 ">
            <span className="text-[12px] text-[#DFA700]">●</span>
            <span className="text-[12px] text-[#9999B0] font-medium">OVERVIEW</span>
          </div>
          <span className="text-[12px] text-[#9999B0]">{dateFormat()}</span>
        </div>

        {/*Dashboard header*/}
        <div className="mb-5">
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3 h-auto">
          <div className="flex items-center bg-[#707F99] h-18.75 p-[18px_20px] rounded-2xl gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#5E7086] rounded-[10px]">
             <MdStorefront size={18} className="text-[#0B1427]"/>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#0B1427]">Total Stores</span>
              <span className="text-[11px] text-[#0B1427]">Open Stores</span>
            </div>
            <div className="ml-auto text-[26px] font-medium text-[#0B1427]">
              <span>5</span>
            </div>
          </div>
          <div className="flex items-center bg-[#C77C5F] h-18.75 p-[18px_20px] rounded-2xl gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#B26B4D] rounded-[10px]">
             <PiPackageDuotone size={18} className="text-[#611E09]"/>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#611E09]">Total Products</span>
              <span className="text-[11px] text-[#611E09]">In inventory</span>
            </div>
            <div className="ml-auto text-[26px] font-medium text-[#611E09]">
              <span>18</span>
            </div>
          </div>
          <div className="flex items-center bg-[#96B39D] h-18.75 p-[18px_20px] rounded-2xl gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#84A18B] rounded-[10px]">
             <LuPhilippinePeso size={18} className="text-[#234024]"/>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#234024]">Total Expenses</span>
              <span className="text-[11px] text-[#234024]">As of today</span>
            </div>
            <div className="ml-auto text-[26px] font-medium text-[#234024]">
              <span>₱30</span>
            </div>
          </div>
          <QuicksStats/>
        </div>
      </div>
    </div>
  )
}

export default DashboardCards
