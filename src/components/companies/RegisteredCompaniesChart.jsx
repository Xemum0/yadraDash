import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DatePicker } from "antd";
import { useState } from "react";
import { format, isWithinInterval } from "date-fns";

const { RangePicker } = DatePicker;

const registrationData = [
	{ date: "2024-01-01", companies: 5 },
	{ date: "2024-01-15", companies: 8 },
	{ date: "2024-02-10", companies: 12 },
	{ date: "2024-03-05", companies: 10 },
	{ date: "2024-04-20", companies: 20 },
	{ date: "2024-06-25", companies: 18 },
];

const RegisteredCompaniesChart = () => {
	const [filteredData, setFilteredData] = useState(registrationData);

	// Handle date range selection
	const handleDateChange = (dates) => {
		if (dates) {
			const [startDate, endDate] = dates;
			const filtered = registrationData.filter((item) =>
				isWithinInterval(new Date(item.date), {
					start: startDate.toDate(),
					end: endDate.toDate(),
				})
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(registrationData);
		}
	};

	return (
		<motion.div
			className='bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold text-gray-900'>Number of Companies</h2>
				<RangePicker
					onChange={handleDateChange}
					className='rounded-lg'
					format="YYYY-MM-DD"
				/>
			</div>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={filteredData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis
							dataKey='date'
							tickFormatter={(tick) => format(new Date(tick), "MMM dd, yyyy")}
							stroke='#9CA3AF'
						/>
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
							formatter={(value) => `${value} companies`}
							labelFormatter={(label) => `Date: ${format(new Date(label), "MMM dd, yyyy")}`}
						/>
						<Legend />
						<Line type='monotone' dataKey='companies' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default RegisteredCompaniesChart;