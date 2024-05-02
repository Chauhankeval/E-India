import { createSlice } from '@reduxjs/toolkit';

// Initial state fetched from localStorage or an empty array if not present
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// Serialize the state before storing in localStorage
const serializedState = initialState.map(item => ({
    ...item,
    // Serialize any non-serializable values, such as _Timestamp
    time: item.time.toString() // Assuming _Timestamp has a toString() method
}));

// Update the initial state with the serialized state
const updatedInitialState = serializedState.length > 0 ? serializedState : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: updatedInitialState,
    reducers: {
        addToCart(state, action) {
            return [...state, action.payload];
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload);
        }
    }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
