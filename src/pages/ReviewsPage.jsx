import { FlagOff, Undo2, ArrowUpNarrowWide, ChartNoAxesCombined } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/reviews/DailyReviews";
import OrderDistribution from "../components/reviews/ReviewDistribution";
import OrdersTable from "../components/reviews/OrdersTable";

const ReviewStats = {
	totalReviews: 100,
	ReviewerRetention: "60%",
	flaggedReviews: 10,
	averageRatingAcrossPlatform: 4.5,
};

const ReviewsPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto bg-white'>
			<Header title={"Reviews"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Reviews' icon={ChartNoAxesCombined} value={ReviewStats.totalReviews.toLocaleString()} color='#6366F1' />
					<StatCard name='Reviewer Retention' icon={Undo2} value={ReviewStats.ReviewerRetention} color='#F59E0B' />
					<StatCard
						name='flagged Reviews'
						icon={FlagOff}
						value={ReviewStats.flaggedReviews.toLocaleString()}
						color='#EF4444'
					/>
					<StatCard name='Average Rating' icon={ArrowUpNarrowWide} value={ReviewStats.averageRatingAcrossPlatform} color='#10B981' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div>

				<OrdersTable />
			</main>
		</div>
	);
};
export default ReviewsPage;
