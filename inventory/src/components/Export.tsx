import React from 'react';
import { Inventory, Store, Product } from '../data/interfaces';

interface Props {
  inventories: Inventory[];
  stores: Store[];
  products: Product[];
}

const Export: React.FC<Props> = ({ inventories, stores, products }) => {
  const downloadCSV = () => {
    const csvRows: string[] = [];
    const headers = ['Date', 'Product', ...stores.map((s) => s.name)];
    csvRows.push(headers.join(','));

    inventories.forEach((inventory) => {
      const product = products.find((p) => p.id === inventory.productId)?.name || '';
      const row = [inventory.date, product, ...stores.map((s) => inventory.stock[s.id] || 0)];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
  };

  return <button className='btn btn-success' onClick={downloadCSV}>Export as CSV</button>;
};

export default Export;
