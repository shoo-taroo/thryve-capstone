import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function ProductModal({ open, onClose, onSaved, initial }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [funFact, setFunFact] = useState('');
  const [sizes, setSizes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (initial) {
      setName(initial.name || '');
      setType(initial.type || '');
      setDescription(initial.description || '');
      setFunFact(initial.funFact || '');
      setSizes(initial.sizes ? [...initial.sizes] : []);
      setImagePreview(initial.images?.[0] || '');
      setImageFile(null);
    } else {
      setName('');
      setType('');
      setDescription('');
      setFunFact('');
      setSizes([]);
      setImageFile(null);
      setImagePreview('');
    }
  }, [initial, open]);

  if (!open) return null;

  const addSize = () => setSizes(prev => [...prev, { id: Date.now(), size: '', price: '' }]);
  const updateSize = (id, field, value) =>
    setSizes(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  const removeSize = (id) => setSizes(prev => prev.filter(s => s.id !== id));

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!name.trim()) return alert('Product name required');
    if (!description.trim()) return alert('Description required');
    if (sizes.length === 0) return alert('Add at least one size');

    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('type', type);
      fd.append('description', description);
      fd.append('funFact', funFact);
      fd.append('sizes', JSON.stringify(sizes.map(s => ({
        size: s.size,
        price: Number(s.price) || 0
      }))));
      if (imageFile) fd.append('image', imageFile);

      if (initial?._id) {
        await api.put(`/api/products/${initial._id}`, fd);
      } else {
        await api.post('/api/products', fd);
      }

      onSaved?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving product.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{initial ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Image upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Image *</label>
            <label className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-gray-500 cursor-pointer hover:bg-gray-50">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded" />
              ) : (
                <>
                  <span className="text-2xl">⬆</span>
                  <span className="mt-2 text-sm">Click to upload</span>
                  <span className="text-xs">PNG, JPG up to 10MB</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          {/* Right: Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Product Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Organic Fertilizer" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Type (Optional)</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Type</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Seedling">Seedling</option>
                <option value="Soil Bag">Soil Bag</option>
                <option value="Coco">Coco</option>
                <option value="Soil Conditioners">Soil Conditioners</option>
                <option value="Step Bricks">Step Bricks</option>
                <option value="Pots">Pots</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe the product..." className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Fun Fact</label>
              <textarea value={funFact} onChange={(e) => setFunFact(e.target.value)} rows={2} placeholder="Interesting detail about this product..." className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Product Sizes</h4>
            <button onClick={addSize} className="text-sm bg-emerald-500 text-white px-3 py-1 rounded">+ Add Size</button>
          </div>
          <div className="space-y-2">
            {sizes.length === 0 && <p className="text-gray-500">No sizes yet. Click "Add Size".</p>}
            {sizes.map(s => (
              <div key={s.id} className="flex gap-2 items-center">
                <select
                  value={s.size}
                  onChange={(e) => updateSize(s.id, 'size', e.target.value)}
                  className="border px-3 py-2 rounded flex-1"
                >
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="1kg">1kg</option>
                  <option value="5kg">5kg</option>
                  <option value="10kg">10kg</option>
                </select>
                <input
                  placeholder="Price"
                  value={s.price}
                  onChange={(e) => updateSize(s.id, 'price', e.target.value)}
                  className="border px-3 py-2 rounded w-32"
                />
                <button onClick={() => removeSize(s.id)} className="text-red-600 px-2">Delete</button>
              </div>
            ))}

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-emerald-500 text-white rounded">{initial ? 'Save' : 'Add Product'}</button>
        </div>
      </div>
    </div>
  );
}
