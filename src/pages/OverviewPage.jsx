import { BarChart2, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import UsersOverviewChart from "../components/overview/UsersOverviewChart";
import Visitors from "../components/overview/Visitors";
const overview_stats = {
	totalCompanies: 115,
	newUsers: 1234,
	totalUsers: 12030,
	userGrowthRate: "12.5%",
};
const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-white'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total companies' icon={Zap} value={overview_stats.totalCompanies.toLocaleString()} color='#6366F1' />
					<StatCard name='New Users' icon={Users} value={overview_stats.newUsers.toLocaleString()} color='#8B5CF6' />
					<StatCard name='Total users' icon={Users} value={overview_stats.totalUsers.toLocaleString()} color='#EC4899' />
					<StatCard name='User growth rate' icon={BarChart2} value={overview_stats.userGrowthRate} color='#10B981' />
				</motion.div>

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<UsersOverviewChart />
					<CategoryDistributionChart />
					<Visitors />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;