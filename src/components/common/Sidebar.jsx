import {
	BarChart2,
	DollarSign,
	Menu,
	Settings,
	Building2,
	MessageCircleCode,
	TrendingUp,
	Users,
	LogOut,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
	{ name: "Companies", icon: Building2, color: "#8B5CF6", href: "/companies" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
	{ name: "Reviews", icon: MessageCircleCode, color: "#F59E0B", href: "/reviews" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Settings", icon: Settings, color: "#454545", href: "/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("isAuthenticated");
		navigate("/login");
	};

	return (
		<motion.div
			className={`relative z-10 flex-shrink-0 h-full`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<div className='h-full bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-300'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-white/20 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div
								className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-white/20 transition-colors mb-2'
								initial={false}
								animate={{ gap: isSidebarOpen ? 16 : 0 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								<item.icon
									size={20}
									style={{ color: item.color, minWidth: "20px" }}
								/>
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap text-gray-900'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.3, ease: "easeInOut" }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>

				{/* Logout Button */}
				<div>
					<motion.button
						onClick={handleLogout}
						className='flex items-center p-4 text-sm font-medium rounded-lg text-red-500 hover:bg-white/20 transition-colors mt-4 w-full'
						whileHover={{ scale: 1.05 }}
					>
						<LogOut size={20} style={{ minWidth: "20px" }} />
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.span
									className='ml-4 whitespace-nowrap'
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								>
									Logout
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default Sidebar;