import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, DatePicker } from "antd";
import { parse, format, isWithinInterval } from "date-fns";

const reviewsData = [
  { date: "2023-01-01", reviews: 45 },
  { date: "2023-01-02", reviews: 50 },
  { date: "2023-01-15", reviews: 55 },
  { date: "2023-02-01", reviews: 60 },
  { date: "2023-02-10", reviews: 65 },
  { date: "2023-03-01", reviews: 70 },
  { date: "2023-03-15", reviews: 75 },
  { date: "2024-01-01", reviews: 80 },
  { date: "2024-01-15", reviews: 85 },
  { date: "2024-02-01", reviews: 90 },
  { date: "2024-02-15", reviews: 95 },
  { date: "2024-03-01", reviews: 100 },
  { date: "2024-03-15", reviews: 110 },
];

const DailyReviews = () => {
  const [selectedGranularity, setSelectedGranularity] = useState("month");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [selectedGranularity, selectedDateRange]);

  const handleGranularityChange = (value) => {
    setSelectedGranularity(value);
  };

  const handleDateRangeChange = (dates) => {
    // Ensure dates are in the format we expect
    if (dates && dates.length === 2) {
      setSelectedDateRange([dates[0], dates[1]]);
    } else {
      setSelectedDateRange([null, null]);
    }
  };

  const filterData = () => {
    const filteredReviews =
      selectedDateRange[0] && selectedDateRange[1]
        ? reviewsData.filter((entry) =>
            isWithinInterval(parse(entry.date, "yyyy-MM-dd", new Date()), {
              start: selectedDateRange[0],
              end: selectedDateRange[1],
            })
          )
        : reviewsData;

    let aggregatedData = [];

    if (selectedGranularity === "day") {
      aggregatedData = aggregateByDay(filteredReviews);
    } else if (selectedGranularity === "month") {
      aggregatedData = aggregateByMonth(filteredReviews);
    } else if (selectedGranularity === "year") {
      aggregatedData = aggregateByYear(filteredReviews);
    }

    setFilteredData(aggregatedData);
  };

  const aggregateByDay = (data) => {
    return data.map((entry) => ({
      date: format(parse(entry.date, "yyyy-MM-dd", new Date()), "yyyy-MM-dd"),
      reviews: entry.reviews,
    }));
  };

  const aggregateByMonth = (data) => {
    const aggregated = data.reduce((acc, entry) => {
      const month = format(
        parse(entry.date, "yyyy-MM-dd", new Date()),
        "yyyy-MM"
      );
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += entry.reviews;
      return acc;
    }, {});

    return Object.keys(aggregated).map((month) => ({
      date: format(parse(month, "yyyy-MM", new Date()), "MMMM yyyy"),
      reviews: aggregated[month],
    }));
  };

  const aggregateByYear = (data) => {
    const aggregated = data.reduce((acc, entry) => {
      const year = format(parse(entry.date, "yyyy-MM-dd", new Date()), "yyyy");
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += entry.reviews;
      return acc;
    }, {});

    return Object.keys(aggregated).map((year) => ({
      date: year,
      reviews: aggregated[year],
    }));
  };

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Reviews Growth Over Time
      </h2>

      <div className="mb-4">
        <Select
          value={selectedGranularity}
          onChange={handleGranularityChange}
          className="w-full"
          options={[
            { label: "By Day", value: "day" },
            { label: "By Month", value: "month" },
            { label: "By Year", value: "year" },
          ]}
        />
      </div>

      <div className="mb-4">
        <DatePicker.RangePicker
          value={
            selectedDateRange && selectedDateRange[0] && selectedDateRange[1]
              ? selectedDateRange
              : null
          }
          onChange={handleDateRangeChange}
          className="w-full"
          format="YYYY-MM-DD"
        />
      </div>

      <div style={{ width: "100%", height: 300 }}>
        {filteredData && filteredData.length > 0 ? (
          <ResponsiveContainer>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#878c91",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="reviews"
                stroke="#8B5CF6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center test-gray-500 text-xl font-semibold py-20">No data available</div>
        )}
      </div>
    </motion.div>
  );
};

export default DailyReviews;
