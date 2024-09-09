import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calendar, BarChart2, Users, RefreshCw } from 'lucide-react';
import backendUrl from '../../config/bcakendUrl.js'

const CustomReports = () => {
  const [report, setReport] = useState(null);
  const [timeframe, setTimeframe] = useState('month');
  const [metric, setMetric] = useState('revenue');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const updateDates = (timeframe) => {
    const currentDate = new Date();
    let start, end;
    switch (timeframe) {
      case 'day':
        start = new Date(currentDate.setDate(currentDate.getDate() - 1));
        break;
      case 'week':
        start = new Date(currentDate.setDate(currentDate.getDate() - 7));
        break;
      case 'month':
        start = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        break;
      case 'year':
        start = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        break;
      default:
        start = new Date();
    }
    end = new Date();
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const generateReport = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${backendUrl}/api/admin/custom-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          metric,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReport(data.reports);
        toast.success('Report generated successfully!');
        console.log(data.reports);
      } else {
        throw new Error(data.message || 'Failed to generate report');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Custom Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => {
                  setTimeframe(e.target.value);
                  updateDates(e.target.value);
                }}
                className="block w-full pl-10 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
            <div className="relative">
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="revenue">Revenue</option>
                <option value="sales">Sales</option>
                <option value="users">New Users</option>
              </select>
              <BarChart2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
        >
          {loading ? (
            <RefreshCw className="animate-spin h-5 w-5 mr-2" />
          ) : (
            <BarChart2 className="h-5 w-5 mr-2" />
          )}
          {loading ? 'Generating...' : 'Generate Report'}
        </button>

        {report && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Report Results</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {metric === 'sales' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Total Sales</h4>
                    <p className="text-2xl font-bold text-gray-900">{report.totalSales}</p>
                  </div>
                </div>
              )}

              {metric === 'revenue' && (
                <div className="bg-white p-4 rounded-md shadow">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h4>
                  <p className="text-2xl font-bold text-gray-900">${report.totalRevenue}</p>
                </div>
              )}

              {metric === 'users' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">New Buyers</h4>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      <ul className="divide-y divide-gray-200">
                        {Array.isArray(report.buyers) && report.buyers.map((buyer, index) => (
                          <li key={index} className="px-6 py-4 flex items-center">
                            <Users className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{buyer.name}</p>
                              <p className="text-sm text-gray-500">{buyer.email}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">New Sellers</h4>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      <ul className="divide-y divide-gray-200">
                        {Array.isArray(report.sellers) && report.sellers.map((seller, index) => (
                          <li key={index} className="px-6 py-4 flex items-center">
                            <Users className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{seller.name}</p>
                              <p className="text-sm text-gray-500">{seller.email}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!report && !loading && (
          <p className="mt-4 text-gray-500 text-center">
            No report generated yet. Select options and click "Generate Report."
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomReports;