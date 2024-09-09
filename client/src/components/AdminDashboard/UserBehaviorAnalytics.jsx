import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PieChart, ShoppingCart, Eye, TrendingUp, RefreshCw } from 'lucide-react';
import backendUrl from '../../config/bcakendUrl';

const UserBehaviorAnalytics = () => {
  const [behaviorData, setBehaviorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    mostViewedProducts: 0,
    abandonedCarts: 0,
    conversionRate: 0
  });
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/user-behavior`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const mostViewed = data.mostViewedProducts.length;
        const abandoned = data.abandonedCarts.length;
        const conversions = data.conversionRate;

        setBehaviorData({
          labels: ['Most Viewed Products', 'Abandoned Carts', 'Conversions'],
          datasets: [
            {
              label: 'User Behavior',
              data: [mostViewed, abandoned, conversions],
              backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
              borderColor: ['#064E3B', '#1E40AF', '#B45309'],
              borderWidth: 1,
            },
          ],
        });
        setDetails({
          mostViewedProducts: mostViewed,
          abandonedCarts: abandoned,
          conversionRate: conversions
        });
        toast.success('User behavior data loaded successfully');
      } else {
        throw new Error(data.message || 'Failed to fetch user behavior data');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <PieChart className="mr-2" /> User Behavior Analytics
        </h2>
        <button
          onClick={fetchData}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          <RefreshCw className="mr-2" /> Refresh Data
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : behaviorData.labels ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <Doughnut
              data={behaviorData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  title: {
                    display: true,
                    text: 'User Behavior Distribution',
                  },
                },
              }}
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-green-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-green-800 font-semibold">Most Viewed Products</p>
                <p className="text-2xl font-bold text-green-900">{details.mostViewedProducts}</p>
              </div>
              <Eye className="text-green-500 w-10 h-10" />
            </div>
            <div className="bg-blue-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-semibold">Abandoned Carts</p>
                <p className="text-2xl font-bold text-blue-900">{details.abandonedCarts}</p>
              </div>
              <ShoppingCart className="text-blue-500 w-10 h-10" />
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-yellow-800 font-semibold">Conversion Rate</p>
                <p className="text-2xl font-bold text-yellow-900">{details.conversionRate}%</p>
              </div>
              <TrendingUp className="text-yellow-500 w-10 h-10" />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No user behavior data available</p>
      )}
    </div>
  );
};

export default UserBehaviorAnalytics;