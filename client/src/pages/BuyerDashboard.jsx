import React, { useState, useRef, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Home, ShoppingCart, Settings, LogOut, User, Key, MapPin, Clock, Menu, X } from 'lucide-react'

const NavItem = ({ icon: Icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
  >
    <Icon className="w-5 h-5 mr-2" />
    {label}
  </Link>
)

const BuyerDashboard = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">MarketPlace</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavItem icon={Home} label="Home" to="/buyer-dashboard" />
                  <NavItem icon={ShoppingCart} label="Cart" to="/buyer-dashboard/cart" />
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      <Settings className="w-5 h-5 mr-2 z-50" />
                      Settings
                    </button>
                    {isDropdownOpen && (
                      <div className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <Link to="/buyer-dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="w-4 h-4 inline mr-2" />Profile
                        </Link>
                        <Link to="/buyer-dashboard/reset-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Key className="w-4 h-4 inline mr-2" />Change Password
                        </Link>
                        <Link to="/buyer-dashboard/change-address" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <MapPin className="w-4 h-4 inline mr-2" />Change Address
                        </Link>
                        <Link to="/buyer-dashboard/order-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Clock className="w-4 h-4 inline mr-2" />Order History
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem icon={Home} label="Home" to="/buyer-dashboard" onClick={toggleMobileMenu} />
              <NavItem icon={ShoppingCart} label="Cart" to="/buyer-dashboard/cart" onClick={toggleMobileMenu} />
              <NavItem icon={User} label="Profile" to="/buyer-dashboard/profile" onClick={toggleMobileMenu} />
              <NavItem icon={Key} label="Change Password" to="/buyer-dashboard/reset-password" onClick={toggleMobileMenu} />
              <NavItem icon={MapPin} label="Change Address" to="/buyer-dashboard/change-address" onClick={toggleMobileMenu} />
              <NavItem icon={Clock} label="Order History" to="/buyer-dashboard/order-history" onClick={toggleMobileMenu} />
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="bg-gray-100 ">
        <div >
          <div className="overflow-x-scroll pt-12">
            <Outlet />
          </div>
        </div>
      </main>


    </div>
  )
}

export default BuyerDashboard