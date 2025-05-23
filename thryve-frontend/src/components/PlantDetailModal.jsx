
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PlantDetailModal = ({ isOpen, onOpenChange, selectedItem, selectedSize, handleSizeSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!selectedItem) return null;
  
  const handleContactSeller = () => {
    toast.success("Contact request sent! We'll get back to you soon.");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white rounded-lg">
        <div className="relative w-full">
          <div className="h-64 w-full overflow-hidden">
            <img 
              src={selectedItem.image} 
              alt={selectedItem.name} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={toggleFavorite}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
            >
              <Heart 
                size={20} 
                className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
              />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">{selectedItem.name}</DialogTitle>
            {selectedItem.scientificName && (
              <DialogDescription className="text-sm italic text-gray-500 mt-1">{selectedItem.scientificName}</DialogDescription>
            )}
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">{selectedItem.description}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Available sizes:</p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.sizes.map((size) => (
                  <button 
                    key={size.size}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      selectedSize === size.size 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleSizeSelect(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Price:</p>
              <p className="text-3xl font-bold text-accent">
                ₱{selectedItem.sizes.find(s => s.size === selectedSize).price.toFixed(2)}
              </p>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                className="w-full py-6 bg-primary hover:bg-primary/90 text-base font-medium flex items-center justify-center gap-2"
                onClick={handleContactSeller}
              >
                <Mail size={20} /> Contact Seller
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 p-2">
                <Phone size={16} /> Call us: (02) 8123-4567
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlantDetailModal;