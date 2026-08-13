import DashboardCards from "../components/Home/DashboardCards"
import SideBar from "../components/SideBar"

const Dashboard = () => {
  return (
    <div className='flex flex-row w-full'>
      <SideBar />
      <div className='flex-1'>
        <DashboardCards/>
      </div>

    </div>
  )
}
export default Dashboard
