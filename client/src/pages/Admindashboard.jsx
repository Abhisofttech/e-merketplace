import React, { useState, useRef, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Settings, BarChart, User, Key, MapPin, ChevronDown, ChevronUp, LogOut } from 'lucide-react'

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

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [isAnalyticsDropdownOpen, setIsAnalyticsDropdownOpen] = useState(false)
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const analyticsDropdownRef = useRef(null)
  const settingsDropdownRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const toggleAnalyticsDropdown = () => {
    setIsAnalyticsDropdownOpen(!isAnalyticsDropdownOpen)
  }

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (analyticsDropdownRef.current && !analyticsDropdownRef.current.contains(event.target)) {
        setIsAnalyticsDropdownOpen(false)
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
      <nav className="bg-gray-800 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">Admin Dashboard</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Analytics Dropdown */}
                  <div className="relative" ref={analyticsDropdownRef}>
                    <button
                      onClick={toggleAnalyticsDropdown}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      <BarChart className="w-5 h-5 mr-2" />
                      Analytics {isAnalyticsDropdownOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </button>
                    {isAnalyticsDropdownOpen && (
                      <div className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <Link to="/admin-dashboard/sales-analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sales Analytics
                        </Link>
                        <Link to="/admin-dashboard/user-behaviour" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          User Behavior Analytics
                        </Link>
                        <Link to="/admin-dashboard/inventry" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Inventory Management
                        </Link>
                        <Link to="/admin-dashboard/custom-reports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Custom Reports
                        </Link>
                      </div>
                    )}
                  </div>

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
                        <Link to="/admin-dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="w-4 h-4 inline mr-2" /> Profile
                        </Link>
                        <Link to="/admin-dashboard/reset-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Key className="w-4 h-4 inline mr-2" /> Change Password
                        </Link>
                        <Link to="/admin-dashboard/change-address" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
              <NavItem label="Sales Analytics" to="/admin-dashboard/sales-analytics" onClick={toggleMobileMenu} />
              <NavItem label="User Behavior Analytics" to="/admin-dashboard/user-behaviour" onClick={toggleMobileMenu} />
              <NavItem label="Inventory Management" to="/admin-dashboard/inventry" onClick={toggleMobileMenu} />
              <NavItem label="Custom Reports" to="/admin-dashboard/custom-reports" onClick={toggleMobileMenu} />
              <NavItem label="Profile" to="/admin-dashboard/profile" onClick={toggleMobileMenu} />
              <NavItem label="Change Password" to="/admin-dashboard/reset-password" onClick={toggleMobileMenu} />
              <NavItem label="Change Address" to="/admin-dashboard/change-address" onClick={toggleMobileMenu} />
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

export default AdminDashboard

