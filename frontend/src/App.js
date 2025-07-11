import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/loginPage";
import SignInPage from './pages/signupPage';
import DashboardPage from './pages/DashboardPage';
import ItemShopPage from './pages/itemShopPage';
import AchievementsPage from './pages/achievementsPage';
import SettingsPage from './pages/settingsPage';
import AnalyticsPage from './pages/analyticsPage';

import SideTopBarLayout from './layouts/sideTopBarLayout';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/dashboard" element={<SideTopBarLayout><DashboardPage /></SideTopBarLayout>} />
        <Route path="/item-shop" element={<SideTopBarLayout><ItemShopPage /></SideTopBarLayout>} />
        <Route path="/achievements" element={<SideTopBarLayout><AchievementsPage /></SideTopBarLayout>} />
        <Route path="/settings" element={<SideTopBarLayout><SettingsPage /></SideTopBarLayout>} />
        <Route path="/analytics" element={<SideTopBarLayout><AnalyticsPage /></SideTopBarLayout>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
