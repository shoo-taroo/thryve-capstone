// src/pages/AdminInventory.jsx
import React, { useEffect, useState, useMemo } from 'react';
import api from '@/lib/api';
import PlantModal from '@/components/PlantModal.jsx';
import ProductModal from '@/components/ProductModal.jsx';

export default function AdminInventory() {
  const [tab, setTab] = useState('plants'); // 'plants' | 'products'
  const [plants, setPlants] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(''); // e.g., Flowering, Indoor
  const [selected, setSelected] = useState(null); // for viewing detail
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editing, setEditing] = useState(null); // pass to modal when editing

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [pRes, prRes] = await Promise.all([api.get('/api/plants'), api.get('/api/products')]);
      setPlants(pRes.data || []);
      setProducts(prRes.data || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching inventory');
    } finally {
      setLoading(false);
    }
  }

  const handleDeletePlant = async (id) => {
    if (!confirm('Delete this plant?')) return;
    try {
      await api.delete(`/api/plants/${id}`);
      setPlants(prev => prev.filter(p => p._id !== id));
      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
      alert('Error deleting plant');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  const filteredPlants = useMemo(() => {
    const q = search.trim().toLowerCase();
    return plants.filter(p => {
      const matchesQ = !q || p.name.toLowerCase().includes(q) || (p.scientificName || '').toLowerCase().includes(q);
      const matchesType = !filterType || (p.type || '').toLowerCase() === filterType.toLowerCase();
      return matchesQ && matchesType;
    });
  }, [plants, search, filterType]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(p => {
      const matchesQ = !q || p.name.toLowerCase().includes(q);
      const matchesType = !filterType || (p.type || '').toLowerCase() === filterType.toLowerCase();
      return matchesQ && matchesType;
    });
  }, [products, search, filterType]);

  const plantTypes = ['All', 'Flowering', 'Orchids', 'Fruit Trees', 'Vegetables', 'Herbs', 'Hanging/Vines', 'Pine Trees', 'Trees', 'Outdoor', 'Bamboo', 'Indoor', 'Cactus'];
  const productTypes = ['All', 'Fertilizer', 'Seedling', 'Soil Bag', 'Coco', 'Soil Conditioners', 'Step Bricks', 'Pots'];

  return (
    <div className="p-6 bg-emerald-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <div className="flex gap-3">
            <button onClick={() => { setEditing(null); setShowPlantModal(true); setTab('plants'); }} className="bg-emerald-500 text-white px-4 py-2 rounded">+ Add Plant</button>
            <button onClick={() => { setEditing(null); setShowProductModal(true); setTab('products'); }} className="bg-emerald-500 text-white px-4 py-2 rounded">+ Add Product</button>
          </div>
        </div>

        {/* tabs */}
        <div className="mb-4">
          <button onClick={() => setTab('plants')} className={`px-4 py-2 rounded ${tab === 'plants' ? 'bg-white shadow' : 'text-gray-600'}`}>Plants</button>
          <button onClick={() => setTab('products')} className={`ml-3 px-4 py-2 rounded ${tab === 'products' ? 'bg-white shadow' : 'text-gray-600'}`}>Products</button>
        </div>

        {/* search + filter */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4 items-center">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${tab === 'plants' ? 'plants' : 'products'}...`} className="border rounded p-2 w-full md:w-96" />
          <select className="border rounded p-2" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            {(tab === 'plants' ? plantTypes : productTypes).map(t => <option key={t} value={t === 'All' ? '' : t}>{t}</option>)}
          </select>
          <div className="flex gap-2 ml-auto">
            <button onClick={fetchAll} className="px-3 py-2 border rounded">Refresh</button>
          </div>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(tab === 'plants' ? filteredPlants : filteredProducts).length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow p-10 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl mb-3">🍃</div>
                <h2 className="text-xl font-bold">
                  {tab === 'plants' ? 'No Plants Found' : 'No Products Found'}
                </h2>
                <p className="text-gray-600 mt-2">
                  Try adjusting your search terms or add a new {tab === 'plants' ? 'plant' : 'product'} to the collection.
                </p>
                <button
                  onClick={() => {
                    if (tab === 'plants') {
                      setEditing(null);
                      setShowPlantModal(true);
                    } else {
                      setEditing(null);
                      setShowProductModal(true);
                    }
                  }}
                  className="mt-4 bg-emerald-500 text-white px-5 py-2 rounded"
                >
                  {tab === 'plants' ? 'Add Your First Plant' : 'Add Your First Product'}
                </button>
              </div>
            </div>
          ) : (
            (tab === 'plants' ? filteredPlants : filteredProducts).map(item => {
              const sizes = item.sizes || [];
              const priceRange = sizes.length
                ? `₱${Math.min(...sizes.map(s => s.price))} - ₱${Math.max(...sizes.map(s => s.price))}`
                : '—';
              return (
                <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img src={(item.images && item.images[0]) || '/placeholder.png'} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    {item.scientificName && <div className="text-sm text-gray-500 italic">{item.scientificName}</div>}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="text-emerald-600 font-semibold">{priceRange}</div>
                      <div className="text-gray-500">{(item.sizes || []).length} sizes</div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button onClick={() => setSelected(item)} className="flex-1 px-3 py-2 border rounded text-left">
                        View
                      </button>
                      <button
                        onClick={() => { setEditing(item); if (tab === 'plants') { setShowPlantModal(true); } else { setShowProductModal(true); } }}
                        className="px-3 py-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => { if (tab === 'plants') handleDeletePlant(item._id); else handleDeleteProduct(item._id); }}
                        className="px-3 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>


        {/* selected detail */}
        {selected && (
          <div className="mt-8 bg-white p-6 rounded shadow">
            <div className="flex gap-6">
              <img src={(selected.images && selected.images[0]) || '/placeholder.png'} alt={selected.name} className="w-64 h-44 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                {selected.scientificName && <div className="text-gray-500 italic">{selected.scientificName}</div>}
                <p className="mt-3 text-gray-700">{selected.description}</p>

                {selected.funFact && (
                  <div className="mt-4 bg-amber-50 p-4 rounded">
                    <strong>Fun Fact:</strong> {selected.funFact}
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-semibold">Available Sizes & Prices</h4>
                  <div className="flex gap-3 mt-3">
                    {(selected.sizes || []).map((s, i) => (
                      <div key={i} className="bg-emerald-50 p-4 rounded flex-1 text-center">
                        <div className="text-sm font-bold">{s.size || s.label}</div>
                        <div className="text-2xl text-emerald-600">₱{s.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button onClick={() => { if (tab === 'plants') handleDeletePlant(selected._id); else handleDeleteProduct(selected._id); setSelected(null); }} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                  <button onClick={() => { setEditing(selected); if (tab === 'plants') setShowPlantModal(true); else setShowProductModal(true); }} className="px-4 py-2 bg-emerald-500 text-white rounded">Edit</button>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* modals */}
      <PlantModal open={showPlantModal} onClose={() => { setShowPlantModal(false); setEditing(null); }} initial={editing} onSaved={fetchAll} />
      <ProductModal open={showProductModal} onClose={() => { setShowProductModal(false); setEditing(null); }} initial={editing} onSaved={fetchAll} />
    </div>
  );
}
