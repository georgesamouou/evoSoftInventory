import React, { useState,forwardRef,Ref, ReactElement } from 'react';
import { Store, Product, Inventory } from '../../data/interfaces';
import { loadInventories, saveInventory } from '../../services/localStorageService';
import { Box, Card, DialogContent, DialogTitle, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import Fade, { FadeProps } from '@mui/material/Fade'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props {
  stores: Store[];
  products: Product[];
  onSubmit: (inventory: Inventory) => void;
}
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
const CreateInventory: React.FC<Props> = ({ stores, products, onSubmit }) => {
  const [date, setDate] = useState('');
  const [productId, setProductId] = useState('');
  const [stock, setStock] = useState<Record<string, number>>({});
  const [show, setShow] = useState<boolean>(false)
  const handleStockChange = (storeId: string, value: number) => {
    setStock({
      ...stock,
      [storeId]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShow(true)
    const currentId = loadInventories().length
    const id = currentId+1
    const newInventory: Inventory = { id,date, productId, stock };
    toast.success("Created")
    onSubmit(newInventory);
  };

  return (
    <Card className='container'>
      <Box>
        <button className='btn btn-primary m-2' onClick={()=>setShow(true)}>
          Creat Inventory
        </button>
      </Box>
      
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogTitle
          title="title"
          sx={{ mb: 2, textAlign:"center" }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2, textAlign:"center" }}>
            Create a new inventory
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            position: 'relative',
            
          }}
        >
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
        </DialogContent>
      </Dialog>
        
    </Card>
  );
};

export default CreateInventory;
