import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Ban } from "lucide-react";

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    reviews: 10,
    status: "Active",
  },
  {
    id: 10,
    name: "joe",
    email: "joe@example.com",
    role: "Customer",
    reviews: 105,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    reviews: 0,
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Customer",
    reviews: 5,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Reviewer",
    reviews: 0,
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Moderator",
    reviews: 0,
    status: "Active",
  },
];

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("customers");
  const [users, setUsers] = useState(userData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
    reviews: 0,
    status: "Active",
  });
  useEffect(() => {
    filterUsers();
  }, []);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterUsers(term, userFilter);
  };

  const filterUsers = (term = searchTerm, filter = userFilter) => {
    let filteredUsers = userData;
    if (filter === "others") {
      filteredUsers = filteredUsers.filter((user) => user.role !== "Customer");
    } else {
      filteredUsers = filteredUsers.filter((user) => user.role === "Customer");
    }

    // Apply search term filter
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );

    setUsers(filteredUsers);
  };

  const handleFilterChange = (filter) => {
    setUserFilter(filter);
    filterUsers(searchTerm, filter);
  };

  const handleSortByReviews = () => {
    const sorted = [...users].sort((a, b) => b.reviews - a.reviews);
    setUsers(sorted);
  };

  const handleBanUser = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    const newUserEntry = {
      ...newUser,
      id: Date.now(),
    };
    setUsers([...users, newUserEntry]);
    setIsAddModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "Customer",
      reviews: 0,
      status: "Active",
    });
  };

  return (
    <motion.div
      className="bg-[#C1DCDC] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => handleFilterChange("customers")}
              className={`px-3 py-1 rounded-md mr-1 ${
                userFilter === "customers"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700"
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => handleFilterChange("others")}
              className={`px-3 py-1 rounded-md ${
                userFilter === "others"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700"
              }`}
            >
              Others
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
          >
            Add User
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-gray-900 text-white placeholder-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-100"
              size={18}
            />
          </div>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Email
            </th>
            {userFilter !== "others" && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Reviews
                {userFilter === "customers" && (
                  <button
                    onClick={handleSortByReviews}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    Sort
                  </button>
                )}
              </th>
            )}
            {userFilter === "others" && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Role
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              {userFilter !== "others" && (
                <td className="px-6 py-4 whitespace-nowrap">{user.reviews}</td>
              )}
              {userFilter === "others" && (
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              )}
              <td
  className={`px-4 py-2 my-3 text-center text-xs font-semibold rounded-full flex items-center justify-center w-auto h-8 ${
    user.status === "Active"
      ? "bg-green-700 text-green-100"
      : "bg-red-700 text-red-100"
  }`}
              >
                {user.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleBanUser(user.id)}
                  className="text-red-400 hover:text-red-300 flex items-center"
                >
                  <Ban className="mr-1" size={16} />
                  {user.status === "Active" ? "Ban" : "Unban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="Customer">Customer</option>
                <option value="Reviewer">Reviewer</option>
                <option value="Moderator">Moderator</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                onClick={handleAddUser}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-red-700 text-white px-4 py-2 rounded-lg ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;
