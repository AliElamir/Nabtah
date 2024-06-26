import './App.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import { useState, useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Client from './services/api'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { useAuth0 } from '@auth0/auth0-react'
import ProduceForm from './pages/ProduceForm'
import ServiceForm from './pages/ServiceForm'
import ToolForm from './pages/ToolForm'
import PackageForm from './pages/PackageForm'
import Landing from './pages/Landing'
import PlantDetail from './components/PlantDetail'
import VendorList from './pages/VendorList'
import ServiceList from './pages/ServiceList'
import AddPlant from './pages/AddPlant'
import Account from './pages/Account'
import PlantList from './pages/PlantList'
import { showUserDetails } from './services/user'
import ToolList from './pages/ToolList'
import UpdateToolForm from './pages/UpdateTool'
import UpdateService from './pages/UpdateService'
import UpdateProduce from './pages/UpdateProduce'
import UpdatePlant from './pages/UpdatePlant'
import UpdatePackage from './pages/UpdatePackage'
import Schedule from './pages/Schedule'
import { ShoppingCartContext } from './context/ShoppingCartContext'
import ShoppingCart from './components/ShoppingCart'
import PaymentFailed from './pages/PaymentFailed'
import PaymentSuccess from './pages/PaymentSuccess'
import Package from './pages/Package'
import UpdateVendorDetails from './pages/UpdateVendorDetails'
import UpdateCustomerDetails from './pages/UpdateCustomerDetails'
import ContactUs from './pages/ContactUs'
import VendorProducts from './pages/VendorProducts'
import ProduceList from './pages/ProduceList'
const App = () => {
  const [updated, setUpdated] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [authenticatedUser, setauthenticatedUser] = useState([])
  let cart = useContext(ShoppingCartContext)

  useEffect(() => {
    if (isAuthenticated && user) {
      const getuserDetails = async () => {
        let response = await showUserDetails(user.sub, user)
        if (
          !user ||
          !user['https://nabtah.com/roles'] ||
          user['https://nabtah.com/roles'].length === 0
        ) {
          //for the case the role wasnt loaded
          window.location.reload()
        }
        response.role = user['https://nabtah.com/roles'][0]
        setauthenticatedUser(response)
        localStorage.setItem('auth0_id', user.sub)
        localStorage.setItem('_id', response._id)
        if (user['https://nabtah.com/roles'] == 'customer') {
          cart.setCartFromDb(response.cart)
        }
      }
      getuserDetails()
    } else {
      localStorage.clear()
    }
  }, [isAuthenticated, user])

  return (
    <div>
      <NavBar authenticatedUser={authenticatedUser} />
      <main className="mt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Landing />} />
          <Route
            path="/produceform"
            element={
              <ProduceForm
                authenticatedUser={authenticatedUser}
                setUpdated={setUpdated}
              />
            }
          />
          <Route
            path="/updateproduce/:id"
            element={
              <UpdateProduce
                setUpdated={setUpdated}
                authenticatedUser={authenticatedUser}
              />
            }
          />
          <Route
            path="/toolform"
            element={
              <ToolForm
                authenticatedUser={authenticatedUser}
                setUpdated={setUpdated}
              />
            }
          />
          <Route
            path="/updatetool/:id"
            element={
              <UpdateToolForm
                setUpdated={setUpdated}
                authenticatedUser={authenticatedUser}
              />
            }
          />
          <Route
            path="/serviceform"
            element={
              <ServiceForm
                authenticatedUser={authenticatedUser}
                setUpdated={setUpdated}
              />
            }
          />
          <Route
            path="/updateservice/:id"
            element={
              <UpdateService
                setUpdated={setUpdated}
                authenticatedUser={authenticatedUser}
              />
            }
          />
          <Route
            path="/packageform"
            element={
              <PackageForm
                authenticatedUser={authenticatedUser}
                setUpdated={setUpdated}
              />
            }
          />
          <Route
            path="/updatepackage/:id"
            element={
              <UpdatePackage
                setUpdated={setUpdated}
                authenticatedUser={authenticatedUser}
              />
            }
          />
          <Route
            path="/addplant"
            element={
              <AddPlant
                authenticatedUser={authenticatedUser}
                setUpdated={setUpdated}
              />
            }
          />
          <Route
            path="/updateplant/:id"
            element={
              <UpdatePlant
                setUpdated={setUpdated}
                authenticatedUser={authenticatedUser}
              />
            }
          />
          <Route path="/plantDetail/:plantId" element={<PlantDetail />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/servicelist" element={<ServiceList />} />
          <Route
            path="/account"
            element={
              <Account
                authenticatedUser={authenticatedUser}
                updated={updated}
              />
            }
          />
          <Route path="/plantlist" element={<PlantList />} />
          <Route path="/producelist" element={<ProduceList />} />
          <Route
            path="/shoppingcart"
            element={<ShoppingCart authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/paymentsuccess"
            element={<PaymentSuccess authenticatedUser={authenticatedUser} />}
          />
          <Route path="/paymentfailed" element={<PaymentFailed />} />
          <Route
            path="/schedule"
            element={
              <Schedule
                authenticatedUser={authenticatedUser}
                updated={updated}
              />
            }
          />
          <Route path="/toollist" element={<ToolList />} />
          <Route path="/packages" element={<Package />} />
          <Route
            path="/updateVendor/:id"
            element={<UpdateVendorDetails setUpdated={setUpdated} />}
          />
          <Route
            path="/updateCustomer/:id"
            element={<UpdateCustomerDetails setUpdated={setUpdated} />}
          />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/vendorproducts/:id" element={<VendorProducts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
