
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import { PATH } from './constants/Path'
import PrivateRoute from './router/PrivateRoute'
import RouterConnection from './router/RouterConnection'
import './App.css'
import Schedules from './pages/home/Schedules'
import PackageDetails from './pages/home/PackageDetails'
import Success from './pages/home/Success'
function App() {
  
  return (
    <>
  <Routes>
        <Route path={PATH.HOME} element={
          <PrivateRoute>
            <RouterConnection />
          </PrivateRoute>
        }>
          <Route index element={<Home />} />
          <Route path={`${PATH.SCHEDULE}?/:id`} element={<Schedules />} />
          <Route path={`${PATH.PACKAGE_DETAILS}?/:id`} element={<PackageDetails />} />
          <Route path={PATH.SUCCESS} element={<Success />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App
