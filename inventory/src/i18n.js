import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files (can be in a folder like `locales/`)
const resources = {
    en: {
      translation: {
        "inventoryManagement": "Inventory Management",
        "date": "Date",
        "product": "Product",
        "store": "Store",
        "save": "Save",
        "cancel": "Cancel",
        "actions": "Actions",
        "edit": "Edit",
        "delete": "Delete",
        "selectProduct": "Select a product",
        "unknownProduct": "Unknown Product",
        "unknownStore": "Unknown Store",
        "updated": "Updated!",
        "articles": "articles",
        "Inventory_Management":"Inventory Management"
      },
    },
    fr: {
      translation: {
        "inventoryManagement": "Gestion des Inventaires",
        "date": "Date",
        "product": "Produit",
        "store": "Magasin",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "actions": "Actions",
        "edit": "Modifier",
        "delete": "Supprimer",
        "selectProduct": "Sélectionnez un produit",
        "unknownProduct": "Produit inconnu",
        "unknownStore": "Magasin inconnu",
        "updated": "Mis à jour !",
        "articles": "articles",
        "Inventory_Management": "Gestion des Inventaires"
      },
    },
  };

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
