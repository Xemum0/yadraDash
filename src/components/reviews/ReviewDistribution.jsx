import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num;
};

const reviewsData = [
  { name: "Company A", reviews: 120 },
  { name: "Company B", reviews: 850 },
  { name: "Company C", reviews: 1500 },
  { name: "Company D", reviews: 2000 },
  { name: "Company E", reviews: 3500 },
];

const ReviewDistribution = () => {
  const sortedReviewsData = [...reviewsData].sort((a, b) => b.reviews - a.reviews);

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Number of Reviews per Company</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={sortedReviewsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatNumber} /> {/* Format Y-Axis labels */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => formatNumber(value)} 
            />
            <Legend />
            <Bar dataKey="reviews" fill="#4ECDC4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ReviewDistribution;