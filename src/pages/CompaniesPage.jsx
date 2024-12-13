import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Zap, TrendingUp } from "lucide-react";
import SalesTrendChart from "../components/companies/RegisteredCompaniesChart";
import CompaniesTable from "../components/companies/CompaniesTable";
import ValidationTable from "../components/companies/Validation";
import CompanyDistributionChart from "../components/companies/CompanyDistributionChart";

const companiesStats = {
	totalCompanies: 115,
	totalBraches: 1234,
	premiumsubscribers: 110,
	nonactivebranches: 130,
};
const CompaniesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-white'>
			<Header title='Companies' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Companies' icon={Zap} value={companiesStats.totalCompanies.toLocaleString()} color='#6366F1' />
					<StatCard name='Total Branches' icon={TrendingUp} value={companiesStats.totalBraches.toLocaleString()} color='#10B981' />
					<StatCard name='Premium Subscribers' icon={DollarSign} value={companiesStats.premiumsubscribers.toLocaleString()} color='#F59E0B' />
					<StatCard name='Non-Active Branches' icon={AlertTriangle} value={companiesStats.nonactivebranches.toLocaleString()} color='#EF4444' />
				</motion.div>

				<CompaniesTable />
				<ValidationTable />
				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CompanyDistributionChart/>
				</div>
			</main>
		</div>
	);
};
export default CompaniesPage;
