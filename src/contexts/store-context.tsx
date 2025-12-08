
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, Order, Address, Banner } from '@/lib/types';
import { PRODUCTS, BANNERS, CATEGORIES } from '@/lib/mock-data';
import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';

interface StoreContextType {
  products: Product[];
  banners: Banner[];
  categories: typeof CATEGORIES;
  wishlist: Product[];
  cart: CartItem[];
  orders: Order[];
  addresses: Address[];
  loading: boolean;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  shippingCost: number;
  addAddress: (address: Omit<Address, 'id'>) => void;
  placeOrder: (address: Address, paymentMethod: string) => Promise<string>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (bannerId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [banners, setBanners] = useState<Banner[]>(BANNERS);
  const [categories] = useState(CATEGORIES);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Load base data
    setProducts(JSON.parse(localStorage.getItem('mita-sharee-products') || JSON.stringify(PRODUCTS)));
    setBanners(JSON.parse(localStorage.getItem('mita-sharee-banners') || JSON.stringify(BANNERS)));

    if (user) {
      // Mock fetching user-specific data
      const storedData = localStorage.getItem(`mita-sharee-store-${user.uid}`);
      if (storedData) {
        const { wishlist, cart, orders, addresses } = JSON.parse(storedData);
        setWishlist(wishlist || []);
        setCart(cart || []);
        setOrders(orders || []);
        setAddresses(addresses || []);
      } else {
        // Default address
        setAddresses([{ id: '1', fullName: 'Test User', mobileNumber: '9876543210', pincode: '110001', addressLine: '123, Janpath', city: 'New Delhi', state: 'Delhi' }]);
      }
    } else {
      setWishlist([]);
      setCart([]);
      setOrders([]);
      setAddresses([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      const dataToStore = JSON.stringify({ wishlist, cart, orders, addresses });
      localStorage.setItem(`mita-sharee-store-${user.uid}`, dataToStore);
    }
  }, [wishlist, cart, orders, addresses, user]);

  useEffect(() => {
      localStorage.setItem('mita-sharee-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
      localStorage.setItem('mita-sharee-banners', JSON.stringify(banners));
  }, [banners]);


  const isWishlisted = (productId: string) => wishlist.some(p => p.id === productId);

  const toggleWishlist = (product: Product) => {
    if (!user) { router.push('/login'); return; }
    setWishlist(prev => 
      isWishlisted(product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (!user) { router.push('/login'); return; }
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: product.id, product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setAddresses(prev => [newAddress, ...prev]);
  };

  const placeOrder = async (address: Address, paymentMethod: string): Promise<string> => {
    if (!user) throw new Error("User not logged in");
    
    await new Promise(res => setTimeout(res, 2000));
    const newOrderId = `order-${Date.now()}`;
    
    const newOrder: Order = {
      id: newOrderId,
      userId: user.uid,
      items: cart,
      total: cartTotal,
      address,
      paymentMethod,
      paymentId: paymentMethod === 'Razorpay' ? `pay_${Date.now()}` : undefined,
      status: 'processing',
      createdAt: Date.now(),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrderId;
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `prod-${Date.now()}` };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addBanner = (banner: Omit<Banner, 'id'>) => {
    const newBanner = { ...banner, id: `banner-${Date.now()}` };
    setBanners(prev => [newBanner, ...prev]);
  };

  const updateBanner = (banner: Banner) => {
    setBanners(prev => prev.map(b => b.id === banner.id ? banner : b));
  };

  const deleteBanner = (bannerId: string) => {
    setBanners(prev => prev.filter(b => b.id !== bannerId));
  };
  
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingCost = cartSubtotal > 0 && cartSubtotal < 5000 ? 100 : 0;
  const cartTotal = cartSubtotal + shippingCost;


  return (
    <StoreContext.Provider
      value={{
        products,
        banners,
        categories,
        wishlist,
        cart,
        orders,
        addresses,
        loading,
        isWishlisted,
        toggleWishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        shippingCost,
        addAddress,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        addBanner,
        updateBanner,
        deleteBanner,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
