import React from "react";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from "../types";

interface itemsSliceState {
    items: Item[]
    isLoading: boolean
    error: string
}

const initialState: itemsSliceState = {
    items: [],
    isLoading: false,
    error: ''
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        itemsFetching(state) {
            state.isLoading = true
        },
        itemsFetchingSuccess(state, action: PayloadAction<Item[]>) {
            state.items = action.payload
            state.isLoading = false
            state.error = ''
        },
        itemsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const { itemsFetching, itemsFetchingSuccess, itemsFetchingError } = itemsSlice.actions
export const itemsReducer = itemsSlice.reducer
