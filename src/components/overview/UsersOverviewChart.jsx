import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const UsersData = [
  { name: "Jul", users: 4200 },
  { name: "Aug", users: 3800 },
  { name: "Sep", users: 5100 },
  { name: "Oct", users: 4600 },
  { name: "Nov", users: 5400 },
  { name: "Dec", users: 7200 },
  { name: "Jan", users: 6100 },
  { name: "Feb", users: 5900 },
  { name: "Mar", users: 6800 },
  { name: "Apr", users: 6300 },
  { name: "May", users: 7100 },
  { name: "Jun", users: 7500 },
];

const UsersOverviewChart = () => {
  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">users growth Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={UsersData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#9CA3AF" />
            <XAxis dataKey={"name"} stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#C1DCDC",
              }}
              itemStyle={{ color: "#000" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default UsersOverviewChart;
