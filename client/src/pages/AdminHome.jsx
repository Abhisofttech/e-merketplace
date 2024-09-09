import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, BarChart2, Settings, HelpCircle } from 'lucide-react';

const AdminHome = () => {
  const username = "Admin"; // Replace with actual admin name or fetch from context/state

  const quickActions = [
    { name: 'Sales Analytics', icon: Users, link: '/admin-dashboard/sales-analytics' },
    { name: 'Product Overview', icon: ShoppingBag, link: '/admin-dashboard/inventry' },
    { name: 'User Behaviour', icon: BarChart2, link: '/admin-dashboard/user-behaviour' },
    { name: 'Profile', icon: Settings, link: '/admin-dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {username}!</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.link}
                  className="bg-indigo-50 overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <action.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{action.name}</dt>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Need Help?</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>If you have any questions or need assistance, our support team is here to help.</p>
              </div>
              <div className="mt-3">
                <Link
                 
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <HelpCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;