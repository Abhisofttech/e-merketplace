import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart2, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import backendUrl from '../../config/bcakendUrl';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageRevenue, setAverageRevenue] = useState(0);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/sales-analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const revenueData = data.salesData.map(item => item.totalRevenue);
        setSalesData({
          labels: data.salesData.map(item => `Month ${item._id}`),
          datasets: [
            {
              label: 'Revenue',
              data: revenueData,
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1,
            },
          ],
        });
        setTotalRevenue(revenueData.reduce((acc, curr) => acc + curr, 0));
        setAverageRevenue(revenueData.reduce((acc, curr) => acc + curr, 0) / revenueData.length);
        toast.success('Sales data loaded successfully');
      } else {
        throw new Error(data.message || 'Failed to fetch sales data');
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <BarChart2 className="mr-2" /> Sales Analytics
        </h2>
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          <RefreshCw className="mr-2" /> Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-blue-800 font-semibold">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalRevenue)}</p>
          </div>
          <DollarSign className="text-blue-500 w-10 h-10" />
        </div>
        <div className="bg-green-100 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-green-800 font-semibold">Average Monthly Revenue</p>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(averageRevenue)}</p>
          </div>
          <TrendingUp className="text-green-500 w-10 h-10" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : salesData.labels ? (
          <Bar
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Monthly Sales Revenue',
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-600">No sales data available</p>
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;


