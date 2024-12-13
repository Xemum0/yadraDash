import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Flag, Filter, MessageSquare } from "lucide-react";

const reviewsData = [
  {
    id: "REV001",
    name: "John Doe",
    date: "2023-07-01",
    criteria: {
      productQuality: 4,
      price: 5,
      deliverySpeed: 3,
      customerService: 4,
      easeOfUse: 5,
    },
    company: "Company A",
    feedback: "Great product, but delivery was a bit slow.",
    isFlagged: false,
  },
  {
    id: "REV002",
    name: "Anonymous",
    date: "2023-07-02",
    criteria: {
      productQuality: 3,
      price: 4,
      deliverySpeed: 4,
      customerService: 2,
      easeOfUse: 4,
    },
    company: "Company B",
    feedback: "Not bad overall, but customer service could improve.",
    isFlagged: false,
  },
  {
    id: "REV003",
    name: "Bob Johnson",
    date: "2023-07-03",
    criteria: {
      productQuality: 5,
      price: 5,
      deliverySpeed: 5,
      customerService: 5,
      easeOfUse: 5,
    },
    company: "Company C",
    feedback: "Excellent service and product. Highly recommend!",
    isFlagged: false,
  },
  {
    id: "REV004",
    name: "Alice Brown",
    date: "2023-07-04",
    criteria: {
      productQuality: 2,
      price: 3,
      deliverySpeed: 1,
      customerService: 2,
      easeOfUse: 3,
    },
    company: "Company D",
    feedback: "The delivery was late and the product quality wasn't great.",
    isFlagged: true,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState(reviewsData);
  const [showOnlyFlagged, setShowOnlyFlagged] = useState(false);
  const [responseInput, setResponseInput] = useState(""); // Store the current response
  const [responseReviewId, setResponseReviewId] = useState(null); // Track the review being responded to
  const role = "moderator"; // Define user role

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterReviews(term, showOnlyFlagged);
  };

  const filterReviews = (term, flaggedOnly) => {
    let filtered = reviewsData.filter(
      (review) =>
        (review.id.toLowerCase().includes(term) ||
          (review.name && review.name.toLowerCase().includes(term)) ||
          review.company.toLowerCase().includes(term)) &&
        (!flaggedOnly || review.isFlagged)
    );
    setFilteredReviews(filtered);
  };

  const toggleFlaggedFilter = () => {
    const newFlaggedState = !showOnlyFlagged;
    setShowOnlyFlagged(newFlaggedState);
    filterReviews(searchTerm, newFlaggedState);
  };

  const handleFlagReview = (reviewId) => {
    const updatedReviews = filteredReviews.map((review) =>
      review.id === reviewId
        ? { ...review, isFlagged: !review.isFlagged }
        : review
    );
    setFilteredReviews(updatedReviews);
  };

  const handleSubmitResponse = () => {
    if (responseInput.trim() !== "") {
      setResponseReviewId(null);
    }
  };

  const handleResponseChange = (e) => {
    setResponseInput(e.target.value);
  };

  const handleOpenResponsePrompt = (reviewId) => {
    setResponseReviewId(reviewId);
  };

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Reviews Management
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              className="bg-gray-900 text-white placeholder-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-100"
              size={18}
            />
          </div>
          <button
            onClick={toggleFlaggedFilter}
            className={`p-2 rounded-full transition-colors ${
              showOnlyFlagged
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            title={
              showOnlyFlagged ? "Show All Reviews" : "Show Only Flagged Reviews"
            }
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Review ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Product Quality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Delivery Speed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Customer Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Ease of Use
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide divide-gray-700">
            {filteredReviews.map((review) => (
              <motion.tr
                key={review.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={review.isFlagged ? "bg-red-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {review.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {review.name || "Anonymous"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {review.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <StarRating rating={review.criteria.productQuality} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <StarRating rating={review.criteria.price} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <StarRating rating={review.criteria.deliverySpeed} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <StarRating rating={review.criteria.customerService} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <StarRating rating={review.criteria.easeOfUse} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {review.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {review.feedback}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex space-x-2">
                  <button
                    onClick={() => handleFlagReview(review.id)}
                    className={`${
                      review.isFlagged
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                    title={review.isFlagged ? "Unflag Review" : "Flag Review"}
                  >
                    <Flag size={18} />
                  </button>
                  {role === "moderator" && (
                    <button
                      onClick={() => handleOpenResponsePrompt(review.id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <MessageSquare size={18} />
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {responseReviewId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Response
            </h3>
            <textarea
              value={responseInput}
              onChange={handleResponseChange}
              className="w-full h-24 mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Write your response..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setResponseReviewId(null)} // Close the modal
                className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                className="bg-gray-900 text-white rounded-md px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewsTable;
