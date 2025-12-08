import type { Product, Category, Banner } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { imageUrl: 'https://placehold.co/400x600', imageHint: 'placeholder' };

export const BANNERS: Banner[] = [
  {
    id: '1',
    title: 'Grand Festive Collection',
    imageUrl: getImage('banner1').imageUrl,
    imageHint: getImage('banner1').imageHint,
  },
  {
    id: '2',
    title: 'Diwali Special Sale',
    imageUrl: getImage('banner2').imageUrl,
    imageHint: getImage('banner2').imageHint,
  },
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Silk Sarees' },
  { id: '2', name: 'Cotton Sarees' },
  { id: '3', name: 'Georgette Sarees' },
  { id: '4', name: 'Designer Sarees' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elegant Red Silk Saree',
    category: '1',
    price: 4999,
    originalPrice: 7999,
    imageUrl: getImage('product1').imageUrl,
    imageHint: getImage('product1').imageHint,
  },
  {
    id: '2',
    name: 'Blue Floral Cotton Saree',
    category: '2',
    price: 1299,
    imageUrl: getImage('product2').imageUrl,
    imageHint: getImage('product2').imageHint,
  },
  {
    id: '3',
    name: 'Green Kanjivaram Saree',
    category: '1',
    price: 8999,
    originalPrice: 12999,
    imageUrl: getImage('product3').imageUrl,
    imageHint: getImage('product3').imageHint,
  },
  {
    id: '4',
    name: 'Pink Sequin Georgette Saree',
    category: '3',
    price: 3499,
    imageUrl: getImage('product4').imageUrl,
    imageHint: getImage('product4').imageHint,
  },
  {
    id: '5',
    name: 'Classic White Linen Saree',
    category: '2',
    price: 1999,
    originalPrice: 2499,
    imageUrl: getImage('product5').imageUrl,
    imageHint: getImage('product5').imageHint,
  },
  {
    id: '6',
    name: 'Vibrant Yellow Bandhani',
    category: '4',
    price: 2899,
    imageUrl: getImage('product6').imageUrl,
    imageHint: getImage('product6').imageHint,
  },
   {
    id: '7',
    name: 'Black Banarasi Silk Saree',
    category: '1',
    price: 6599,
    originalPrice: 9999,
    imageUrl: getImage('product7').imageUrl,
    imageHint: getImage('product7').imageHint,
  },
  {
    id: '8',
    name: 'Stylish Purple Chiffon Saree',
    category: '3',
    price: 2199,
    imageUrl: getImage('product8').imageUrl,
    imageHint: getImage('product8').imageHint,
  },
];

// Mock API fetching functions
export const getProducts = async (): Promise<Product[]> => {
  return new Promise(resolve => setTimeout(() => resolve(PRODUCTS), 500));
};

export const getBanners = async (): Promise<Banner[]> => {
  return new Promise(resolve => setTimeout(() => resolve(BANNERS), 500));
};

export const getCategories = async (): Promise<Category[]> => {
    return new Promise(resolve => setTimeout(() => resolve(CATEGORIES), 500));
};
