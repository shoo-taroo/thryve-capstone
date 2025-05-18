import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import AdminOverview from "./pages/Overview";
import AdminInventory from "./pages/Inventory";
import AdminReports from "./pages/Reports";


// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import Adminlayout from "./components/AdminLayout";

const App = () => {
  const location = useLocation();

  // Define valid public routes and admin routes
  const publicRoutes = ['/', '/plant-store', '/about-us', '/faqs', '/contact-us'];
  const adminRoutes = ['/admin', '/admin/login'];
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

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isPublicRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default App;