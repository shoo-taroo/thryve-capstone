import { Download, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";

const DownloadApp = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <SectionHeading
              title="Get the Thryve App"
              subtitle="Download our app and take your plant care experience to the next level"
              center={false}
            />

            <div className="text-gray-600 max-w-md space-y-4">
              <p>Never forget to water your plants again. Track, monitor, and care for your plants with ease using our intuitive mobile application.</p>
              <p>Access detailed care guides, set reminders, and connect with plant experts - all from your smartphone.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Download Now</h3>
                <div className="flex flex-wrap gap-4">
                  {/* Thryve APK Download Link */}
                  <a
                    href="https://download1580.mediafire.com/9uvpm20l3sbggGqFCModylTXzk17m5xMxuXVNKPpPXbyXu-tmGvOsuNGIeEPi9dx0esb8qrQf1g-w2OtxPoOAUWMaDIC6JeFDbVlp5WPFM17t7MF3qTlNPQC2NhTlCcBMn6E9UzYDCyk8hEVhaGsP8WkbchhGx9ZK3KeqgFaJhqx/7187b8o6yth3pn9/Thryve.apk"
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-6 h-6" />
                    <span className="text-sm font-semibold">Download Thryve App (APK)</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Scan to Download</h3>
                <div className="bg-white p-4 inline-flex rounded-lg shadow-md">
                  <QrCode size={120} className="text-primary" />
                </div>
              </div>

              <div className="pt-4">
                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative max-w-[280px]">
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-xl">
                {/* Screen content */}
                <div className="aspect-[9/16] bg-primary/10 flex flex-col items-center justify-center p-4">
                  <img src="/lovable-uploads/67ac2224-bd23-4bd6-8f7e-0f740357f819.png" alt="Plant App Screenshot" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/4 -right-16 w-40 h-40 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute bottom-1/4 -left-16 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
              <div className="absolute top-1/2 -left-5 w-10 h-10 bg-accent/10 rounded-full -z-10"></div>
              <div className="absolute bottom-1/3 -right-5 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-neutral py-16">
        <div className="container">
          <SectionHeading
            title="App Features"
            subtitle="Everything you need to care for your plants in one place"
            center={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Plant Care Reminders</h3>
              <p className="text-gray-600">Never miss a watering day with customized reminders based on plant needs</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Plant Identification</h3>
              <p className="text-gray-600">Simply take a photo and discover what plant you have</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Care Guides</h3>
              <p className="text-gray-600">Access detailed care information for thousands of plants</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up Your Plant Care?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download the Thryve app today and start giving your plants the care they deserve.
          </p>
          <button className="px-8 py-4 bg-white text-primary font-semibold rounded-md shadow-lg transition-all hover:bg-opacity-90 flex items-center gap-2 mx-auto">
            <Download size={20} />
            Download App Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;