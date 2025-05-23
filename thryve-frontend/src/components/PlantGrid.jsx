import PlantCard from './PlantCard';

const PlantGrid = ({ plants, onItemClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {plants.length > 0 ? (
        plants.map((plant) => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onItemClick={onItemClick}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No plants found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PlantGrid;