import { useState } from 'react';
import { Eye } from 'lucide-react';

const PlantCard = ({ plant, onItemClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="h-64 overflow-hidden cursor-pointer relative"
        onClick={() => onItemClick(plant)}
      >
        <img 
          src={plant.image} 
          alt={plant.name} 
          className={`w-full h-full object-cover transform transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity">
            <div className="bg-white/90 rounded-full p-3 flex items-center justify-center">
              <Eye size={20} className="text-primary" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-primary text-lg">{plant.name}</h3>
        {plant.scientificName && (
          <p className="text-xs text-gray-500 italic mb-2">{plant.scientificName}</p>
        )}
        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-accent text-lg">₱{plant.sizes[0].price.toFixed(2)}</p>
          <div className="flex space-x-2">
            {plant.sizes.map((size) => (
              <span 
                key={size.size}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full"
              >
                {size.size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;