import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הגדרת סוגי הנתונים
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  customerName: '',
  customerPhone: '',
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCustomerName: (state, action: PayloadAction<string>) => {
      state.customerName = action.payload;
    },
    setCustomerPhone: (state, action: PayloadAction<string>) => {
      state.customerPhone = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.totalPrice -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { setCustomerName, setCustomerPhone, addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
