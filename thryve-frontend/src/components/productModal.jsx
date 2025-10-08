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
      setImagePreview(initial.images && initial.images[0] ? initial.images[0] : '');
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

  const addSize = () => setSizes(prev => [...prev, { id: Date.now(), label: '', price: '' }]);
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

    try {
      let imageUrls = initial && initial.images ? [...initial.images] : [];

      if (imageFile) {
        const fd = new FormData();
        fd.append('file', imageFile);
        const res = await api.post('/api/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
        imageUrls = [res.data.url, ...imageUrls];
      }

      const payload = {
        name,
        type,
        description,
        funFact,
        sizes: sizes.map(s => ({ label: s.label, price: Number(s.price) || 0 })),
        images: imageUrls,
      };

      if (initial && initial._id) {
        await api.put(`/api/products/${initial._id}`, payload);
      } else {
        await api.post('/api/products', payload);
      }

      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{initial ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Image *</label>
            <div className="border border-dashed rounded p-4 flex items-center justify-center">
              {imagePreview ? <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded" /> : <div className="text-gray-400">PNG, JPG up to 10MB</div>}
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-3" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Product Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded p-2 mb-2" />

            <label className="block text-sm font-medium">Type (optional)</label>
            <input value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded p-2 mb-2" />

            <label className="block text-sm font-medium">Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border rounded p-2 mb-2" />

            <label className="block text-sm font-medium">Fun Fact</label>
            <textarea value={funFact} onChange={(e) => setFunFact(e.target.value)} rows={2} className="w-full border rounded p-2" />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Product Sizes</h4>
            <button className="text-sm bg-green-500 text-white px-3 py-1 rounded" onClick={addSize}>+ Add Size</button>
          </div>
          <div className="space-y-2">
            {sizes.length === 0 && <div className="text-gray-500">No sizes yet. Click "Add Size".</div>}
            {sizes.map(s => (
              <div key={s.id} className="flex gap-2 items-center">
                <input placeholder="Label (e.g., 1kg)" value={s.label} onChange={(e) => updateSize(s.id, 'label', e.target.value)} className="border p-2 rounded flex-1" />
                <input placeholder="Price" value={s.price} onChange={(e) => updateSize(s.id, 'price', e.target.value)} className="border p-2 rounded w-32" />
                <button onClick={() => removeSize(s.id)} className="text-red-600 px-2">Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">{initial ? 'Save' : 'Add Product'}</button>
        </div>
      </div>
    </div>
  );
}
