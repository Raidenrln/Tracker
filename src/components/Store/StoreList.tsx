
import { dateFormat } from '../../utils/date';
import Storecard from './Storecard';

const StoreList = () => {

  return (<>
      <div className="bg-[#F5F4F0] w-full h-screen">
      <div className="p-4"> 
        <div className="flex gap-1 items-center justify-between">
          <div className="flex gap-1 ">
            <span className="text-[12px] text-[#DFA700]">●</span>
            <span className="text-[12px] text-[#9999B0] font-medium">STORE</span>
          </div>
          <span className="text-[12px] text-[#9999B0]">{dateFormat()}</span>
        </div>
        <div className="mb-5">
          <h1 className="font-bold text-2xl">Store List:</h1>
          <div>
            <Storecard/>
          </div>
        </div>
        </div>
        </div>
        </>  
  )
}
export default StoreList
