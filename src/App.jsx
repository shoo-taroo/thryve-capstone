import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './assets/components/Layout';
import HomePage from './assets/pages/HomePage';
import AboutUsPage from './assets/pages/AboutUsPage';
import ContactUsPage from './assets/pages/ContactUsPage';
import PlantStorePage from './assets/pages/PlantStorePage';
import FAQsPage from './assets/pages/FAQsPage';
import NotFoundPage from './assets/pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="store" element={<PlantStorePage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;