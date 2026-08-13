import AppRoutes from "./routes/AppRoutes"
import SideBar from './components/SideBar'

const App = () => {
  return (
    <div className='flex'>
      <div className='flex-1'>
        <AppRoutes/>
      </div>
    </div>
  )
}

export default App