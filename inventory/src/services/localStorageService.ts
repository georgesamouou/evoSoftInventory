import { Inventory } from "../data/interfaces";

const INVENTORY_KEY = 'storesdata';

export const saveInventory = (inventories: Inventory[]): void => {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventories));
};

export const loadInventories = (): Inventory[] => {
  const data = localStorage.getItem(INVENTORY_KEY);
  return data ? JSON.parse(data) : [];
};
