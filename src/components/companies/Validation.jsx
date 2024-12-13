import { useState } from "react";
import { motion } from "framer-motion";
const REQUEST_DATA = [
  {
    id: 1,
    fullName: "John Doe",
    website: "https://example.com",
    companyName: "Example Corp",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    description: "A leading example company.",
    socialMedia: {
      facebook: "https://facebook.com/example",
      instagram: "https://instagram.com/example",
      linkedin: "https://linkedin.com/company/example",
    },
    category: "Technology",
    creationDate: "2024-12-10",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    website: "https://greenshop.com",
    companyName: "Green Shop",
    email: "jane.smith@greenshop.com",
    phone: "987-654-3210",
    description: "Eco-friendly retail solutions.",
    socialMedia: {
      facebook: "https://facebook.com/greenshop",
      instagram: "https://instagram.com/greenshop",
      linkedin: "https://linkedin.com/company/greenshop",
    },
    category: "Retail",
    creationDate: "2024-12-12",
  },
];

const ValidationTable = () => {
  const [requests, setRequests] = useState(REQUEST_DATA);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const approveRequest = (id) => {
    const updatedRequests = requests.filter((req) => req.id !== id);
    setRequests(updatedRequests);
    alert("Request Approved!");
  };

  const rejectRequest = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    const updatedRequests = requests.filter((req) => req.id !== selectedRequest.id);
    setRequests(updatedRequests);
    setIsModalOpen(false);
    setRejectionReason("");
    alert(`Request Rejected: ${rejectionReason}`);
  };

  const openRejectModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Validate Company Requests ({requests.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Website Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Social Media
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Creation Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {requests.map((request) => (
              <motion.tr
                key={request.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                  <a href={request.website} target="_blank" rel="noreferrer">
                    {request.website}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                  <a href={request.socialMedia.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>,{" "}
                  <a href={request.socialMedia.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>,{" "}
                  <a href={request.socialMedia.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {request.creationDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-green-700 hover:text-green-800 mr-2"
                    onClick={() => approveRequest(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="text-red-700 hover:text-red-800"
                    onClick={() => openRejectModal(request)}
                  >
                    Reject
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Reject Request</h3>
            <textarea
              placeholder="Write your reason here..."
              className="w-full border rounded-lg p-3 mb-4"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={rejectRequest}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ValidationTable;