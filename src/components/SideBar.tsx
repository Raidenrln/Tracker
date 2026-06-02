import { NavLink } from 'react-router-dom'
import { useSideBar } from '../context/SideBarContext'
import { LuArrowLeftFromLine } from 'react-icons/lu'
import { MdOutlineDashboard, MdStorefront, MdSettings } from 'react-icons/md'
import { PiPackageDuotone } from 'react-icons/pi'
import { LuPhilippinePeso } from 'react-icons/lu'

type NavItem = {
  to: string
  label: string
  icon: React.ReactNode
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/',          label: 'Dashboard', icon: <MdOutlineDashboard size={22} />, end: true },
  { to: '/Store',     label: 'Stores',    icon: <MdStorefront size={22} /> },
  { to: '/Products',  label: 'Products',  icon: <PiPackageDuotone size={22} /> },
  { to: '/expenses',  label: 'Expenses',  icon: <LuPhilippinePeso size={22} /> },
]

const SideBar = () => {
  const { isShow, setIsShow } = useSideBar()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'flex items-center p-2 rounded-md transition-all duration-200 ease-in-out overflow-hidden',
      isShow ? 'gap-2' : 'justify-center',
      isActive
        ? 'bg-white text-[#1A1A18] font-semibold'
        : 'text-gray-400 hover:bg-white/10 hover:text-white',
    ].join(' ')

  const labelClass = (visible: boolean) =>
    `flex-shrink-0 text-sm overflow-hidden transition-all duration-200 ${
      visible ? 'opacity-100 w-auto' : 'opacity-0 w-0'
    }`

  return (
    <aside className="bg-[#1A1A18] h-screen shrink-0">
      <div
        className={`flex flex-col h-full p-2 transition-all duration-300 ease-in-out ${
          isShow ? 'w-48' : 'w-15'
        }`}
      >
        {/* Header */}
        <div className={`h-12 flex items-center mb-1 ${isShow ? 'justify-between px-1' : 'justify-center'}`}>
          <span
            className={`text-white text-lg font-bold whitespace-nowrap overflow-hidden transition-all duration-300 origin-left ${
              isShow ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}
          >
            Tracker
          </span>
          <button
            onClick={() => setIsShow(!isShow)}
            aria-label={isShow ? 'Collapse sidebar' : 'Expand sidebar'}
            className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-md hover:bg-white/10"
          >
            <LuArrowLeftFromLine
              size={20}
              className={`transition-transform duration-300 ${!isShow ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <hr className="border-white/10 mb-2" />

        {/* Main nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(({ to, label, icon, end }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={end}>
              <span className="min-w-5.5 flex items-center justify-center shrink-0">
                {icon}
              </span>
              <span className={labelClass(isShow)}>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Settings */}
        <div className="mt-auto">
          <hr className="border-white/10 mb-2" />
          <NavLink to="/settings" className={navLinkClass}>
            <span className="min-w-5.5 flex items-center justify-center shrink-0">
              <MdSettings size={22} />
            </span>
            <span className={labelClass(isShow)}>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default SideBar