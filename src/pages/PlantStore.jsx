import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';

const PlantStore = () => {
  const [filter, setFilter] = useState('all');
  
  const plants = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱850.00',
      size: 'M',
      category: 'indoor',
    },
    {
      id: 2,
      name: 'Snake Plant',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱550.00',
      size: 'S',
      category: 'indoor',
    },
    {
      id: 3,
      name: 'Fiddle Leaf Fig',
      image: 'https://images.unsplash.com/photo-1603912674852-e8109c83ff96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱1,250.00',
      size: 'L',
      category: 'indoor',
    },
    {
      id: 4,
      name: 'Peace Lily',
      image: 'https://images.unsplash.com/photo-1558693168-c370615b54e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱650.00',
      size: 'M',
      category: 'indoor',
    },
    {
      id: 5,
      name: 'ZZ Plant',
      image: 'https://images.unsplash.com/photo-1623903088432-70f10106b0d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱750.00',
      size: 'M',
      category: 'indoor',
    },
    {
      id: 6,
      name: 'Rubber Plant',
      image: 'https://images.unsplash.com/photo-1594576722512-582bcd46fba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱850.00',
      size: 'M',
      category: 'indoor',
    },
    {
      id: 7,
      name: 'Pothos',
      image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱350.00',
      size: 'S',
      category: 'hanging',
    },
    {
      id: 8,
      name: 'Aloe Vera',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱250.00',
      size: 'S',
      category: 'succulent',
    },
    {
      id: 9,
      name: 'Bird of Paradise',
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱1,550.00',
      size: 'L',
      category: 'indoor',
    },
    {
      id: 10,
      name: 'String of Pearls',
      image: 'https://images.unsplash.com/photo-1629084092232-b7b3fa74cd4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱450.00',
      size: 'S',
      category: 'hanging',
    },
    {
      id: 11,
      name: 'Philodendron',
      image: 'https://images.unsplash.com/photo-1596997865768-5f2e937df5fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱550.00',
      size: 'M',
      category: 'indoor',
    },
    {
      id: 12,
      name: 'Cactus Collection',
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₱350.00',
      size: 'S',
      category: 'succulent',
    },
  ];
  
  const filteredPlants = filter === 'all' 
    ? plants 
    : plants.filter(plant => plant.category === filter || plant.size === filter);
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Plant Store</h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral/90">
            Discover our carefully curated collection of beautiful, healthy plants for your home.
          </p>
        </div>
      </section>
      
      {/* Store Section */}
      <section className="section-padding bg-neutral">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('all')}
            >
              All Plants
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'indoor' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('indoor')}
            >
              Indoor Plants
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'hanging' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('hanging')}
            >
              Hanging Plants
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'succulent' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('succulent')}
            >
              Succulents
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'S' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('S')}
            >
              Small Plants
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'M' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('M')}
            >
              Medium Plants
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'L' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => setFilter('L')}
            >
              Large Plants
            </button>
          </div>
          
          {/* Plants Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <div 
                key={plant.id} 
                className="scroll-animation card overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover transform transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary">{plant.name}</h3>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                      {plant.size}
                    </span>
                  </div>
                  <p className="font-semibold text-accent">{plant.price}</p>
                  <button className="mt-3 w-full py-2 bg-primary text-white text-sm font-medium rounded transition-colors hover:bg-primary/90">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="bg-primary rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help Finding the Right Plant?</h2>
              <p className="mb-6 text-neutral/90">
                Our plant experts are here to help you find the perfect plant for your space and lifestyle.
              </p>
              <button className="bg-white text-primary font-medium px-6 py-3 rounded-md transition-colors hover:bg-neutral">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantStore;