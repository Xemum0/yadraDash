import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const COMPANY_DATA = [
  {
    id: 1,
    name: "Tech Innovators",
    description: "A leading tech company.",
    category: "Technology",
    address: {
      street: "123 Innovation Blvd",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      postal_code: "94103",
    },
    website: "https://techinnovators.com",
    phone: "123-456-7890",
    branches: [
      { name: "San Francisco", reviews: 120 },
      { name: "New York", reviews: 98 },
    ],
    creationDate: "2024-12-10",
    subscription: "Premium",
  },
  {
    id: 2,
    name: "Green Grocers",
    description: "Fresh produce at your doorstep.",
    category: "Retail",
    address: {
      street: "456 Market St",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      postal_code: "90001",
    },
    website: "https://greengrocers.com",
    phone: "987-654-3210",
    branches: [
      { name: "Los Angeles", reviews: 75 },
      { name: "Seattle", reviews: 65 },
    ],
    creationDate: "2024-12-10",
    subscription: "normal",
  },
];

const CompaniesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(COMPANY_DATA);
  const [expandedBranch, setExpandedBranch] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = COMPANY_DATA.filter(
      (company) =>
        company.name.toLowerCase().includes(term) ||
        company.category.toLowerCase().includes(term)
    );
    setFilteredCompanies(filtered);
  };

  const toggleBranch = (companyId) => {
    setExpandedBranch(expandedBranch === companyId ? null : companyId);
  };

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Registered Companies ({COMPANY_DATA.length})
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search companies..."
            className="bg-gray-900 text-white placeholder-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-100" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Branches
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                creation Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredCompanies.map((company) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {company.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="relative">
                    <button
                      onClick={() => toggleBranch(company.id)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      View Branches <ChevronDown className="ml-2" size={18} />
                    </button>
                    {expandedBranch === company.id && (
                      <div className="absolute bg-white border rounded shadow-md mt-2 w-64 z-10">
                        {company.branches.map((branch, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <span>{branch.name}</span>
                            <span className="text-sm text-gray-500">
                              {branch.reviews} reviews
                            </span>
                            <button className="text-red-600 hover:text-red-800">
                              Ban
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {company.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {`${company.address.street}, ${company.address.city}, ${company.address.state}, ${company.address.country} (${company.address.postal_code})`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span
                    className={`
    text-${company.subscription === "normal" ? "red" : "green"}-100 
    font-bold 
    text-sm
    shadow-lg 
    px-2 
    py-1 
    rounded-lg
    bg-${company.subscription === "normal" ? "red" : "green"}-500
  `}
                  >
                    {company.subscription}
                  </span>{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {company.creationDate}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CompaniesTable;
