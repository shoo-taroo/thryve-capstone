//routes
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import HomePage from './assets/pages/HomePage';  // Update this path
import AboutUsPage from './assets/pages/AboutUsPage';
import ContactUsPage from './assets/pages/ContactUsPage';
//components
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/contact' element={<ContactUsPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;