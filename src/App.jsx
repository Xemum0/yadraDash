import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import Test from "./pages/Test";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ReviewsPage from "./pages/ReviewsPage";
import CompaniesPage from "./pages/CompaniesPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
              {/* BG */}
              <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#C1DCDC] to-white opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
              </div>
              <Sidebar />
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/companies" element={<CompaniesPage/>} />
                <Route path="/users" element={<UsersPage />} />
                {/* <Route path="/sales" element={<SalesPage />} /> */}
                <Route path="/reviews" element={<ReviewsPage />} />
                {/* <Route path="/analytics" element={<AnalyticsPage />} /> */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;