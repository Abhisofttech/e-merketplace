import React, { useState, useRef, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ShoppingBag, Settings, LogOut, User, Key, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

const NavItem = ({ label, to, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </Link>
)

const SellerDashboard = () => {
  const navigate = useNavigate()
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const productDropdownRef = useRef(null)
  const settingsDropdownRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen)
  }

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false)
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setIsSettingsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 fixed w-full z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">Seller Dashboard</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Product Dropdown */}
                  <div className="relative" ref={productDropdownRef}>
                    <button
                      onClick={toggleProductDropdown}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Product {isProductDropdownOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </button>
                    {isProductDropdownOpen && (
                      <div className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <Link to="/seller-dashboard/show-product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Products
                        </Link>
                        <Link to="/seller-dashboard/create-product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Create Product
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Order Link */}
                  <NavItem
                    label="Order"
                    to="/seller-dashboard/orders"
                    icon={<ShoppingBag className="w-5 h-5" />}
                  />

                  {/* Settings Dropdown */}
                  <div className="relative" ref={settingsDropdownRef}>
                    <button
                      onClick={toggleSettingsDropdown}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Settings {isSettingsDropdownOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </button>
                    {isSettingsDropdownOpen && (
                      <div className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <Link to="/seller-dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="w-4 h-4 inline mr-2" /> Profile
                        </Link>
                        <Link to="/seller-dashboard/reset-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Key className="w-4 h-4 inline mr-2" /> Change Password
                        </Link>
                        <Link to="/seller-dashboard/change-address" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <MapPin className="w-4 h-4 inline mr-2" /> Change Address
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
                  <ChevronUp className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <ChevronDown className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem label="Products" to="/seller-dashboard/show-products" onClick={toggleMobileMenu} />
              <NavItem label="Create Product" to="/seller-dashboard/create-product" onClick={toggleMobileMenu} />
              <NavItem label="Order" to="/seller-dashboard/orders" onClick={toggleMobileMenu} />
              <NavItem label="Profile" to="/seller-dashboard/profile" onClick={toggleMobileMenu} />
              <NavItem label="Change Password" to="/seller-dashboard/reset-password" onClick={toggleMobileMenu} />
              <NavItem label="Change Address" to="/seller-dashboard/change-address" onClick={toggleMobileMenu} />
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

      <main className="bg-gray-100">
        <div>
          <div className="overflow-x-scroll pt-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default SellerDashboard



