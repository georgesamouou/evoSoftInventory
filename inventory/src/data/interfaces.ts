export interface Store {
    id: string;
    name: string;
    address: string;
  }
  
export interface Product {
    id: string;
    name: string;
    price: number;
}
  
export interface Inventory {
    date: string;
    productId: string;
    stock: Record<string, number>;  // Record<storeId, stock>
}
  