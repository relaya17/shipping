// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  customerName: string | null;
  customerPhone: string | null;
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  customerName: null,
  customerPhone: null,
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action: PayloadAction<CartState>) => {
      state.customerName = action.payload.customerName;
      state.customerPhone = action.payload.customerPhone;
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    clearCart: (state) => {
      state.customerName = null;
      state.customerPhone = null;
      state.items = [];
      state.totalPrice = 0;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
});

export const { setCartData, clearCart, addItem, removeItem, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
