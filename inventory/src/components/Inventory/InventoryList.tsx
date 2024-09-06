import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation(); 
    const [isEditing, setIsEditing] = useState<number | null>(null);  
    const [editingInventory, setEditingInventory] = useState<Inventory | null>(null);
    
    const getProductName = (productId: string) => {
        const product = products.find((p) => p.id === productId);
        return product ? `${product.name} || ${product.price} FCFA` : t('unknownProduct');
    };

    const [inventory, setInventory] = useState<Inventory[]>(inventories);
    useEffect(() => {
        setInventory(inventories);
    }, []);

    const getStoreName = (storeId: string) => {
        const store = stores.find((s) => s.id === storeId);
        return store ? store.name : t('unknownStore');
    };

    const getStoreInfo = (stock: Record<string, number>) => {
        const stockId = Object.keys(stock)[0];
        const store = stores.find((s) => Number(s.id) === Number(stockId));
        return store ? `${store.name} ||   ${stock[stockId]} ${t('articles')}` : t('unknownStore');
    };

    const getStoreStock = (stock: Record<string, number>) => {
        const stockValue = Object.values(stock)[0];
        return stockValue ? stockValue : '0';
    };

    const columns: GridColDef<Inventory>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: t('date'), width: 190 },
        {
            field: 'productId',
            headerName: t('product'),
            width: 300,
            valueGetter: (params: string) => getProductName(params), 
            editable: false,
        },
        {
            field: 'stock',
            headerName: t('store'),
            width: 300,
            valueGetter: (params: Record<string, number>) => getStoreInfo(params), 
            editable: false,
        },
    ];

    const handleEditClick = (index: number) => {
        setIsEditing(index);
        setEditingInventory({ ...inventories[index] });
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
            toast(t('updated'));
        }
    };

    const handleCancelClick = () => {
        setIsEditing(null);
        setEditingInventory(null);
    };

    return (
        <Card className='container'>
            <table className="table table-striped table-bordered container">
                <thead className="thead-dark">
                    <tr>
                        <th>{t('date')}</th>
                        <th>{t('product')}</th>
                        {stores.map((store) => (
                            <th key={store.id}>{store.name}</th>
                        ))}
                        <th>{t('actions')}</th>
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
                                            <option value="">{t('selectProduct')}</option>
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
                                        <button className="btn btn-primary" onClick={() => handleSaveClick(index)}>{t('save')}</button>
                                        <button className="btn btn-secondary" onClick={handleCancelClick}>{t('cancel')}</button>
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
                                        <button className="btn btn-warning" onClick={() => handleEditClick(index)}>{t('edit')}</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteClick(index)}>{t('delete')}</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </Card>
    );
};

export default InventoryList;
