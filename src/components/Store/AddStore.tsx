import { Plus } from "lucide-react";
const AddStore = () => {
  return (
      <div className="fixed bottom-6 right-6 z-50 animate-float">
        <div
          className="
            group
            flex h-12 w-12
            items-center justify-center
            rounded-full
            bg-linear-to-br from-blue-500 to-indigo-600
            shadow-xl shadow-blue-500/30
            transition-all duration-300
            hover:scale-110
            active:scale-95
            cursor-pointer
          "
        >
          <Plus
            size={24}
            className="text-white transition-transform duration-300 group-hover:rotate-90"
          />
        </div>
      </div>
  )
}
export default AddStore
