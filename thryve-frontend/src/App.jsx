import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Landing Pages
import HomePage from "./pages/landing/Home";
import PlantList from "./pages/landing/PlantList"; // Adjusted per folder structure
import AboutUs from "./pages/landing/AboutUs";
import FAQs from "./pages/landing/FAQs";
import ContactUs from "./pages/landing/ContactUs";
import DownloadApp from "./pages/landing/DownloadApp";
import LoginPage from "./pages/landing/Login";

// Admin Pages
import AdminInventory from "./pages/admin/Inventory";
import Feedback from "./pages/admin/Feedback";

// Not Found Page
import NotFound from "./pages/NotFound";

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
          <Route path="/plant-list" element={<PlantList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/download" element={<DownloadApp />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="feedback" element={<Feedback />} />
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