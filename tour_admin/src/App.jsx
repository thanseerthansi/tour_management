
import { Route, Routes } from 'react-router-dom'
import { PATH } from './constants/Path'
import PageLogin from './pages/public/LoginPage'
import PageNotFound from './pages/public/PageNotFound'
import PrivateRoute from './router/PrivateRoute'
import RouterConnection from './router/RouterConnection'
import Packages from './pages/private/Packages'
import Enquiry from './pages/private/Enquiry'
import Country from './pages/private/Country&City'
import Schedule from './pages/private/Schedules'
import Banner from './pages/private/Banner'

function App() {


  return (
    <div>
      <Routes>
        <Route path={PATH.LOGIN} element={<PageLogin />} />
        <Route path={PATH.HOME} element={<PrivateRoute><RouterConnection/></PrivateRoute>} >
          <Route index element={<Packages />} />
          <Route path={PATH.ENQUIRY} element={<Enquiry />} />
          <Route path={PATH.COUNTRY} element={<Country />} />
          <Route path={`${PATH.SCHEDULE}?/:id`} element={<Schedule />} />
          <Route path={PATH.BANNER} element={<Banner />} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  )
}

export default App
