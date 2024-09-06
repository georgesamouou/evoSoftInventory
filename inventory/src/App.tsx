import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadInventories, saveInventory } from './services/localStorageService';
import { Inventory, Product, Store } from './data/interfaces';
import CreateInventory from './components/Inventory/CreateInventory';
import InventoryList from './components/Inventory/InventoryList';
import { Box, Card, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toast'
import Header from './components/Header';
import Export from './components/Export';
function App() {
  const stores: Store[] = [
    { id: '1', name: 'Store A', address: 'Address A' },
    { id: '2', name: 'Store B', address: 'Address B' },
  ];

  const products: Product[] = [
    { id: '1', name: 'Product 1', price: 100 },
    { id: '2', name: 'Product 2', price: 200 },
  ];

  const [inventories, setInventories] = useState<Inventory[]>(loadInventories());

  const handleAddInventory = (inventory: Inventory) => {
    const newInventories = [...inventories, inventory];
    setInventories(newInventories);
    saveInventory(newInventories);
  };
  const handleDeleteInventory = (index: number) => {
    const newInventories = inventories.filter((_, i) => i !== index);
    setInventories(newInventories);
    saveInventory(newInventories);
  };

  const handleUpdateInventory = (index: number, updatedInventory: Inventory) => {
    const newInventories = inventories.map((inventory, i) => (i === index ? updatedInventory : inventory));
    setInventories(newInventories);
    saveInventory(newInventories);
  };
  return (
    < >
      <Header/>
      <Typography variant='h5' component='span' sx={{ mb: 10,mt:10, textAlign:"center" }}>
        <h1>Inventory Management</h1>
      </Typography>
      <div className='text-center'>
        <Export inventories={inventories} stores={stores} products={products}/>
      </div>
      <CreateInventory stores={stores} products={products} onSubmit={handleAddInventory} />
      <Box>
        <InventoryList
          inventories={inventories}
          stores={stores}
          products={products}
          onDelete={handleDeleteInventory}
          onUpdate={handleUpdateInventory}
        />
        <ToastContainer />
      </Box>
    </>
  );
}

export default App;
