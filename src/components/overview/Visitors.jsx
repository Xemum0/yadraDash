import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// Dummy data for visits
const dailyData = [
  { day: "Monday", visits: 1200 },
  { day: "Tuesday", visits: 2100 },
  { day: "Wednesday", visits: 800 },
  { day: "Thursday", visits: 1600 },
  { day: "Friday", visits: 2400 },
  { day: "Saturday", visits: 1800 },
  { day: "Sunday", visits: 2000 },
];

const monthlyData = [
  { month: "Jan", visits: 12000 },
  { month: "Feb", visits: 15000 },
  { month: "Mar", visits: 20000 },
  { month: "Apr", visits: 18000 },
  { month: "May", visits: 22000 },
  { month: "Jun", visits: 25000 },
  { month: "Jul", visits: 30000 },
  { month: "Aug", visits: 27000 },
  { month: "Sep", visits: 23000 },
  { month: "Oct", visits: 29000 },
  { month: "Nov", visits: 31000 },
  { month: "Dec", visits: 35000 },
];

const yearlyData = [
  { year: "2019", visits: 120000 },
  { year: "2020", visits: 150000 },
  { year: "2021", visits: 200000 },
  { year: "2022", visits: 250000 },
  { year: "2023", visits: 300000 },
];

// Format numbers into k/m notation
const formatNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value;
};

function Visitors() {
  const [timeRange, setTimeRange] = useState("daily");
  const [chartData, setChartData] = useState(dailyData);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setTimeRange(value);

    // Update chart data based on selected range
    if (value === "daily") {
      setChartData(dailyData);
    } else if (value === "monthly") {
      setChartData(monthlyData);
    } else if (value === "yearly") {
      setChartData(yearlyData);
    }
  };

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md lg:col-span-2 shadow-lg rounded-xl p-6 border border-gray-300 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          Users Growth Overview
        </h2>
        <select
          className="p-2 border rounded-md text-gray-700 bg-white shadow-sm"
          value={timeRange}
          onChange={handleFilterChange}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={
                timeRange === "daily"
                  ? "day"
                  : timeRange === "monthly"
                  ? "month"
                  : "year"
              }
            />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip
              formatter={(value) => formatNumber(value)}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default Visitors;
