import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Account from '../pages/Account'

import { Link } from 'react-router-dom'
const NavBar = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <div>
      <div>
        <div className=" flex justify-around  bg-green-200 text-blue-900">
          <Link to="/home">Home</Link>
          <Link to="/servicelist">Services</Link>
          <Link to="/vendorlist">Vendors</Link>
          <Link to="/serviceform">Add a Service</Link>
          <Link to="/produceform">Add a Produce</Link>
          <Link to="/packageform">Add a Package</Link>
          <Link to="/toolform">Add a tool</Link>
        </div>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
      {/* <Account/> */}
        <Account />
      </div>
    </div>
  )
}

export default NavBar
