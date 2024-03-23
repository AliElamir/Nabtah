import './App.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Client from './services/api'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

import ProduceForm from './pages/ProduceForm'
import ServiceForm from './pages/ServiceForm'
import ToolForm from './pages/ToolForm'
import PackageForm from './pages/PackageForm'
import Landing from './pages/Landing'
import PlantDetail from './components/PlantDetail'
import VendorList from './pages/VendorList'
import ServiceList from './pages/ServiceList'

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('auth0_id', user.sub)
    } else {
      localStorage.clear()
    }
  }, [isAuthenticated, user])
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    const getVendors = async () => {
      const response = await Client.get('/vendor')
      console.log(response.data)
      setVendors(response.data)
    }
    getVendors()
  }, [])

  return (
    <div>
      <h1 className=" text-cyan-900 text-3xl text-center">Nabtah</h1>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home vendors={vendors} />} />
          <Route path="/produceform" element={<ProduceForm />} />
          <Route path="/toolform" element={<ToolForm />} />
          <Route path="/serviceform" element={<ServiceForm />} />
          <Route path="/packageform" element={<PackageForm />} />
          <Route path="/plantDetail/:plantId" element={<PlantDetail />} />
          <Route
            path="/vendorlist"
            element={<VendorList vendors={vendors} />}
          />
          <Route path="/servicelist" element={<ServiceList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
