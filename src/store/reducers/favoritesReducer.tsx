import React from "react";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Item } from "../types";
import { addItemToFavorite, removeFavoriteItem } from "../asyncActions";

interface favoritesSliceState {
    favorites: Item[]
    isLoading: boolean
    error: string
}

const initialState: favoritesSliceState = {
    favorites: [],
    isLoading: false,
    error: ''
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        favoritesFetching(state) {
            state.isLoading = false
        },
        favoritesFetchingSuccess(state, action: PayloadAction<CartItem[]>) {
            state.favorites = action.payload
            state.isLoading = false
            state.error = ''
        },
        favoritesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(removeFavoriteItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeFavoriteItem.fulfilled, (state, action: PayloadAction<number>) => {
            state.isLoading = false
            state.favorites = state.favorites.filter((item) => item.id !== action.payload)
        })
        builder.addCase(removeFavoriteItem.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(addItemToFavorite.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addItemToFavorite.fulfilled, (state, action: PayloadAction<Item>) => {
            state.isLoading = false
            state.favorites.push(action.payload)
        })
        builder.addCase(addItemToFavorite.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { favoritesFetching, favoritesFetchingSuccess, favoritesFetchingError } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer