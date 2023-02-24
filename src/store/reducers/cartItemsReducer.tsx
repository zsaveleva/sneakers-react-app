import React from "react";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from "../types";
import { addItemToCart, removeCartItem } from "../asyncActions";

interface cartItemsSliceState {
    totalPrice: number
    cartItems: CartItem[]
    cartState: boolean
    isAdded: boolean
    isLoading: boolean
    error: string
}

const initialState: cartItemsSliceState = {
    totalPrice: 0,
    cartItems: [],
    cartState: false,
    isAdded: false,
    isLoading: false,
    error: ''

}

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        cleanCart(state) {
            state.cartItems = []
        },
        openCart(state) {
            state.cartState = true
        },

        onCloseCart(state) {
            state.cartState = false
        },
        cartItemsFetching(state) {
            state.isLoading = true
        },
        cartItemsFetchingSuccess(state, action: PayloadAction<CartItem[]>) {
            state.cartItems = action.payload
            state.isLoading = false
            state.error = ''
        },
        cartItemsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(removeCartItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeCartItem.fulfilled, (state, action: PayloadAction<number>) => {
            state.isLoading = false
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        })
        builder.addCase(removeCartItem.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(addItemToCart.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
            state.isLoading = false
            state.cartItems.push(action.payload)
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        })
        builder.addCase(addItemToCart.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {
    cleanCart,
    openCart,
    onCloseCart,
    cartItemsFetching,
    cartItemsFetchingSuccess,
    cartItemsFetchingError
} = cartItemsSlice.actions
export const cartItemsReducer = cartItemsSlice.reducer