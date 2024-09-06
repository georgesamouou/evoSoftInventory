import React, { useState } from 'react';
import { Store, Product, Inventory } from '../../data/interfaces';
import { loadInventories, saveInventory } from '../../services/localStorageService';
import { Card } from '@mui/material';

interface Props {
  stores: Store[];
  products: Product[];
  onSubmit: (inventory: Inventory) => void;
}

const CreateInventory: React.FC<Props> = ({ stores, products, onSubmit }) => {
  const [date, setDate] = useState('');
  const [productId, setProductId] = useState('');
  const [stock, setStock] = useState<Record<string, number>>({});

  const handleStockChange = (storeId: string, value: number) => {
    setStock({
      ...stock,
      [storeId]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const currentId = loadInventories().length
    const id = currentId+1
    const newInventory: Inventory = { id,date, productId, stock };
    onSubmit(newInventory);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product:</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="form-select"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        {stores.map((store) => (
          <div key={store.id} className="mb-3">
            <label className="form-label">{store.name}:</label>
            <input
              type="number"
              value={stock[store.id] || ''}
              onChange={(e) => handleStockChange(store.id, parseInt(e.target.value))}
              className="form-control"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Save Inventory
        </button>
      </form>
    </Card>
  );
};

export default CreateInventory;
