import { motion } from "framer-motion";

const SettingSection = ({ icon: Icon, title, children ,margin}) => {
	return (
		<motion.div
		className={`${margin ? "mt-28" : "mt-0"} bg-[#C1DCDC] bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8 z-10`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex items-center mb-4'>
				<Icon className='text-indigo-400 mr-4' size='24' />
				<h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
			</div>
			{children}
		</motion.div>
	);
};
export default SettingSection;
