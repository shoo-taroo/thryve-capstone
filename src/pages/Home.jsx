import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { Star, Droplet, Sun, Thermometer, Wind } from 'lucide-react';

const HomePage = () => {
    // Featured plants data
    const featuredPlants = [
        {
            id: 1,
            name: 'Monstera Deliciosa',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: '₱850.00',
            size: 'M',
        },
        {
            id: 2,
            name: 'Snake Plant',
            image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: '₱550.00',
            size: 'S',
        },
        {
            id: 3,
            name: 'Fiddle Leaf Fig',
            image: 'https://images.unsplash.com/photo-1603912674852-e8109c83ff96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: '₱1,250.00',
            size: 'L',
        },
    ];

    // Features data
    const features = [
        {
            title: 'Plant Care Reminders',
            description: 'Never forget to water or fertilize your plants with custom reminders.',
            icon: <Droplet className="h-10 w-10 text-secondary" />,
        },
        {
            title: 'Light Requirements',
            description: 'Track sun exposure and optimize plant placement for healthy growth.',
            icon: <Sun className="h-10 w-10 text-secondary" />,
        },
        {
            title: 'Temperature Monitoring',
            description: 'Keep track of ideal temperature conditions for your plants.',
            icon: <Thermometer className="h-10 w-10 text-secondary" />,
        },
        {
            title: 'Humidity Alerts',
            description: 'Get notified when humidity levels aren\'t optimal for your plants.',
            icon: <Wind className="h-10 w-10 text-secondary" />,
        },
    ];

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            content: "Thryve completely changed how I care for my plants. I'm no longer killing them accidentally!",
            author: "Maria Santos",
            role: "Plant Enthusiast",
            rating: 5,
        },
        {
            id: 2,
            content: "The reminders are a game-changer for busy plant parents. Highly recommend this app!",
            author: "John Mendoza",
            role: "Urban Gardener",
            rating: 5,
        },
        {
            id: 3,
            content: "From a plant killer to a plant parent, all thanks to Thryve's care guides and reminders.",
            author: "Ana Cruz",
            role: "Beginner Plant Collector",
            rating: 4,
        },
    ];

    return (
        <>
            {/* Hero Banner */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url(https://images.pexels.com/photos/32059881/pexels-photo-32059881/free-photo-of-vibrant-tropical-plant-in-sunlit-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
                        backgroundBlendMode: "overlay",
                    }}
                >
                    <div className="absolute inset-0 bg-black/35"></div>
                </div>
                <div className="container relative z-10 text-white">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                            Keep Your Plants Thriving with Thryve
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
                            The complete plant care management system that helps you nurture your green companions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                            <Link to="/plant-store" className="bg-[#569F8B] btn-accent text-center">
                                Explore Plants
                            </Link>
                            <button className="px-6 py-3 font-semibold border-2 border-white rounded-md transition-all duration-300 hover:bg-white hover:text-primary">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-white">
                <div className="container">
                    <SectionHeading
                        title="How Thryve Works"
                        subtitle="Take the guesswork out of plant care with our easy-to-use features"
                        center={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="scroll-animation p-6 rounded-lg border border-gray-100 hover:border-secondary transition-all duration-300 text-center"
                            >
                                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/5 p-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Plants */}
            <section className="section-padding bg-neutral">
                <div className="container">
                    <SectionHeading
                        title="Featured Plants"
                        subtitle="Discover our collection of beautiful, easy-to-care-for plants"
                        center={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredPlants.map((plant) => (
                            <div
                                key={plant.id}
                                className="scroll-animation card overflow-hidden"
                            >
                                <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-xl text-primary">{plant.name}</h3>
                                        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                                            {plant.size}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-accent">{plant.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/plant-store" className="btn-primary">
                            View All Plants
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Store Section */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="scroll-animation order-2 md:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                Welcome to Rosemar Garden
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Since 2000, Rosemar Garden has been your trusted floral partner, bringing over two decades of passion, creativity, and dedication to every bouquet we craft. From classic roses to vibrant mixed arrangements, we offer a wide variety of fresh plants tailored to every occasion.
                            </p>
                            <Link to="/about-us" className="btn-primary inline-block">
                                Learn More About Us
                            </Link>
                        </div>
                        <div className="scroll-animation order-1 md:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1561378133-3fc698604d34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Rosemar Garden"
                                className="rounded-lg shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-primary text-white">
                <div className="container">
                    <SectionHeading
                        title="Our Services"
                        subtitle="We provide a range of services to help you care for your plants"
                        center={true}
                        className="text-white"


                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Plant Identification</h3>
                            <p className="mb-4 text-neutral/90">Not sure what plant you have? Our app can identify thousands of plant species with just a photo.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Watering Schedule</h3>
                            <p className="mb-4 text-neutral/90">Get customized watering schedules based on your plant's species, location, and environment.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Disease Detection</h3>
                            <p className="mb-4 text-neutral/90">Identify common plant diseases and get treatment recommendations quickly.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Growth Tracking</h3>
                            <p className="mb-4 text-neutral/90">Track your plant's growth over time with photo journals and measurements.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Care Guides</h3>
                            <p className="mb-4 text-neutral/90">Access detailed care guides for thousands of plant species.</p>
                        </div>
                        <div className="scroll-animation p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
                            <p className="mb-4 text-neutral/90">Connect with other plant lovers to share tips, ask questions, and get advice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-neutral">
                <div className="container">
                    <SectionHeading
                        title="What Our Users Say"
                        subtitle="Don't just take our word for it - hear from our plant-loving community"
                        center={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="scroll-animation p-6 rounded-lg bg-white border border-gray-100 shadow-sm"
                            >
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={i < testimonial.rating ? "fill-accent text-accent" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <p className="mb-6 text-gray-600 italic">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-primary">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-accent py-16">
                <div className="container">
                    <div className="text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up Your Plant Care?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Download the Thryve app today and start giving your plants the care they deserve.
                        </p>
                        <button className="px-8 py-4 bg-white text-accent font-semibold rounded-md shadow-lg transition-all hover:bg-opacity-90">
                            Download App Now
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;