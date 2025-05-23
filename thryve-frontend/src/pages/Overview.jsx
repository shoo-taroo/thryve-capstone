import { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminOverview = () => {
  const [timeRange, setTimeRange] = useState('This Week');

  // Sample data for the charts
  const plantTypeData = [
    { name: 'Ornamental Plant', value: 50, color: '#8884d8' },
    { name: 'Flowering Plant', value: 35, color: '#e179c6' },
    { name: 'Foliage Plant', value: 15, color: '#f47b7b' },
  ];

  const diseaseData = [
    { name: 'Downey Mildew', value: 40, color: '#ff4088' },
    { name: 'Bacterial Wilt', value: 35, color: '#36a2eb' },
    { name: 'Fungal Leaf Spot', value: 25, color: '#ffcd56' },
  ];

  const orderData = [
    { month: 'Jan', Rose: 15, ZZPlant: -20, PrayerPlant: 30 },
    { month: 'Feb', Rose: 25, ZZPlant: -10, PrayerPlant: 40 },
    { month: 'Mar', Rose: 30, ZZPlant: 5, PrayerPlant: 45 },
    { month: 'Apr', Rose: 40, ZZPlant: 15, PrayerPlant: 55 },
    { month: 'May', Rose: 45, ZZPlant: 25, PrayerPlant: 50 },
    { month: 'Jun', Rose: 30, ZZPlant: 20, PrayerPlant: 60 },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Users',
      value: '156',
      description: 'Active accounts',
      color: 'bg-purple-600',
      textColor: 'text-white',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      description: 'Last 30 days',
      color: 'bg-indigo-900',
      textColor: 'text-white',
    },
    {
      title: 'Access Logs',
      value: '2.5k',
      description: 'Monthly entries',
      color: 'bg-blue-900',
      textColor: 'text-white',
    },
    {
      title: 'Active Sessions',
      value: '45',
      description: 'Current users',
      color: 'bg-blue-600',
      textColor: 'text-white',
    },
  ];
  
  // Recent activities
  const recentActivities = [
    {
      user: 'John Doe',
      action: 'Updated system configuration',
      timestamp: '2 hours ago',
    },
    {
      user: 'Jane Smith',
      action: 'Added new user account',
      timestamp: '4 hours ago',
    },
    {
      user: 'Mike Johnson',
      action: 'Modified user permissions',
      timestamp: '6 hours ago',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg shadow-md p-6 text-center`}>
            <h2 className="text-4xl font-bold mb-2 text-white">{card.value}</h2>
            <p className={`${card.textColor} opacity-90`}>{card.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent System Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">{activity.user}</p>
                <p className="text-gray-600">{activity.action}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
