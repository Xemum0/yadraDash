import { useState } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
	// Initial user data as state variables
	const [userName, setUserName] = useState("John Doe");
	const [userEmail, setUserEmail] = useState("john.doe@example.com");
	const [userProfilePicture, setUserProfilePicture] = useState("https://randomuser.me/api/portraits/men/10.jpg");
	const [isModalOpen, setIsModalOpen] = useState(false); 

	const handleEditProfile = () => {
		setIsModalOpen(true); 
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSaveChanges = () => {
		setIsModalOpen(false); 
	};

	// Handle image upload
	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUserProfilePicture(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleNameChange = (event) => {
		setUserName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setUserEmail(event.target.value);
	};

	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src={userProfilePicture}
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-900'>{userName}</h3>
					<p className='text-gray-800'>{userEmail}</p>
				</div>
			</div>

			<button
				className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'
				onClick={handleEditProfile}
			>
				Edit Profile
			</button>

			{/* Modal for editing profile */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
						<h2 className='text-2xl font-semibold mb-4'>Edit Profile</h2>

						{/* Profile Image upload */}
						<div className='mb-4'>
							<label htmlFor='profileImage' className='block text-gray-700'>
								Profile Image
							</label>
							<input
								type='file'
								id='profileImage'
								accept='image/*'
								className='w-full p-2 border border-gray-300 rounded'
								onChange={handleImageUpload}
							/>
						</div>

						{/* Name input */}
						<div className='mb-4'>
							<label htmlFor='name' className='block text-gray-700'>
								Full Name
							</label>
							<input
								type='text'
								id='name'
								className='w-full p-2 border border-gray-300 rounded'
								value={userName}
								onChange={handleNameChange}
							/>
						</div>

						{/* Email input */}
						<div className='mb-4'>
							<label htmlFor='email' className='block text-gray-700'>
								Email
							</label>
							<input
								type='email'
								id='email'
								className='w-full p-2 border border-gray-300 rounded'
								value={userEmail}
								onChange={handleEmailChange}
							/>
						</div>

						<div className='flex justify-between'>
							<button
								className='bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600'
								onClick={handleCloseModal}
							>
								Cancel
							</button>
							<button
								className='bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700'
								onClick={handleSaveChanges}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			)}
		</SettingSection>
	);
};

export default Profile;