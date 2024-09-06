import React, { useState,useEffect } from 'react';
import { Store, Product, Inventory } from '../../data/interfaces';
import { saveInventory } from '../../services/localStorageService';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props {
    inventories: Inventory[];
    stores: Store[];
    products: Product[];
    onDelete: (index: number) => void;  
    onUpdate: (index: number, updatedInventory: Inventory) => void;  
}

const InventoryList: React.FC<Props> = ({ inventories, stores, products, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState<number | null>(null);  
    const [editingInventory, setEditingInventory] = useState<Inventory | null>(null);
    
    const getProductName = (productId: string) => {
        const product = products.find((p) => p.id === productId);
        return product ? `${product.name} || ${product.price} FCFA` : 'Unknown Product';
    };
    const [inventory,setInventory] = useState<Inventory[]>(inventories)
    useEffect(() => {
        setInventory(inventories)
    }, [])
    
    //console.log(inventories)
    const getStoreName = (storeId: string) => {
        const store = stores.find((s) => s.id === storeId);
        return store ? store.name : 'Unknown Store';
    };
    const getStoreInfo = (stock: Record<string, number>)=>{
        const stockId = Object.keys(stock)[0]
        const store = stores.find((s) => Number(s.id) === Number(stockId));
        return store ? `${store.name} ||   ${stock[stockId]} articles ` : 'Unknown Store';
    }
    const getStoreStock = (stock: Record<string, number>)=>{
        const stockValue = Object.values(stock)[0]
        return stockValue ? stockValue : '0';
    }
    const columns: GridColDef<Inventory>[] = [
        { field: 'id', headerName: 'ID', width: 70, },
        
        { field: 'date', headerName: 'date', width: 190 },
        {
            field: 'productId',
            headerName: 'Product',
            width: 300,
            valueGetter: (params: string) => getProductName(params), 
            editable: false,
        },
        {
            field: 'stock',
            headerName: 'Store',
            width: 300,
            valueGetter: (params: Record<string, number>) => getStoreInfo(params), 
            editable: false,
        },
        
    ];
    
    const storeFunction = ()=>{
        stores.forEach((e: Store)=>{
            const name = e.name
            columns.push({
                field:"store",
                headerName: name,
                width: 300,
                valueGetter: (params: string) => getProductName(params), 
                editable: false,
            })
        })
    }
    /*useEffect(()=>{
        storeFunction()
    },[])*/
    
    const handleEditClick = (index: number) => {
        setIsEditing(index);
        setEditingInventory({ ...inventories[index] });
        
        console.log("toast")
    };

    const handleDeleteClick = (index: number) => {
        onDelete(index);  
    };
    const handleFieldChange = (field: keyof Inventory, value: string | Record<string, number>) => {
        if (editingInventory) {
        setEditingInventory({
            ...editingInventory,
            [field]: value,
        });
        }
    };

    const handleStockChange = (storeId: string, value: number) => {
        if (editingInventory) {
        setEditingInventory({
            ...editingInventory,
            stock: {
            ...editingInventory.stock,
            [storeId]: value,
            },
        });
        }
    };

    const handleSaveClick = (index: number) => {
        if (editingInventory) {
        onUpdate(index, editingInventory); 
        setIsEditing(null);
        setEditingInventory(null);
        toast("Updated!")
        }
    };

    const handleCancelClick = () => {
        setIsEditing(null);
        setEditingInventory(null);
    };
    
  return (
    <Card className='container'>
        {/*<div style={{ height: 300,}}>
            <DataGrid rows={inventories} columns={columns} />
        </div>*/}
        <table className="table table-striped table-bordered container">
            <thead className="thead-dark">
                <tr>
                <th>Date</th>
                <th>Product</th>
                {stores.map((store) => (
                    <th key={store.id}>{store.name}</th>
                ))}
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventories.map((inventory, index) => (
                <tr key={index}>
                    {isEditing === index ? (
                    <>
                        <td>
                        <input
                            type="date"
                            className="form-control"
                            value={editingInventory?.date || ''}
                            onChange={(e) => handleFieldChange('date', e.target.value)}
                        />
                        </td>
                        <td>
                        <select
                            className="form-control"
                            value={editingInventory?.productId || ''}
                            onChange={(e) => handleFieldChange('productId', e.target.value)}
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                            ))}
                        </select>
                        </td>
                        {stores.map((store) => (
                        <td key={store.id}>
                            <input
                            type="number"
                            className="form-control"
                            value={editingInventory?.stock[store.id] || ''}
                            onChange={(e) => handleStockChange(store.id, parseInt(e.target.value))}
                            />
                        </td>
                        ))}
                        <td>
                        <button className="btn btn-primary" onClick={() => handleSaveClick(index)}>Save</button>
                        <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                        </td>
                    </>
                    ) : (
                    <>
                        <td>{inventory.date}</td>
                        <td>{getProductName(inventory.productId)}</td>
                        {stores.map((store) => (
                        <td key={store.id}>{inventory.stock[store.id] || 0}</td>
                        ))}
                        <td className='d-flex justify-content-between ml-3 mr-3'>
                            <button className="btn btn-warning" onClick={() => handleEditClick(index)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteClick(index)}>Delete</button>
                        </td>
                    </>
                    )}
                </tr>
                ))}
            </tbody>
        </table>
        <ToastContainer/>
    </Card>
  );
};

export default InventoryList;
