import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
import HomePage from "./pages/Home";
import PlantStore from "./pages/PlantStore";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import DownloadApp from "./pages/DownloadApp";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import AdminOverview from "./pages/Overview";
import AdminInventory from "./pages/Inventory";
import AdminReports from "./pages/Reports";
import Feedback from "./pages/Feedback";
import PlantCare from "./pages/PlantCare";
import UserManagement from "./pages/UserManagement";
import SystemConfig from "./pages/SystemConfig";
import AccessLogs from "./pages/AccessLogs";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./components/AdminLayout";

const App = () => {
  const location = useLocation();

  // Define valid public routes and admin routes
  const publicRoutes = ['/', '/plant-store', '/about-us', '/faqs', '/contact-us', '/download'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animation');

      scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check for elements
    setTimeout(handleScroll, 300);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <TooltipProvider>
      <ScrollToTop />
      {isPublicRoute && <Navbar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/plant-store" element={<PlantStore />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/download" element={<DownloadApp />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="plant-care" element={<PlantCare />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="system-config" element={<SystemConfig />} />
            <Route path="access-logs" element={<AccessLogs />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isPublicRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
      <Toaster position="top-center"/>
    </TooltipProvider>
  );
};

export default App;