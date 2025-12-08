export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name:string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageHint: string;
};

export type Banner = {
  id: string;
  title: string;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type Address = {
  id: string;
  pincode: string;
  fullName: string;
  mobileNumber: string;
  addressLine: string;
  city: string;
  state: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  address: Address;
  paymentMethod: string;
  paymentId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
};
