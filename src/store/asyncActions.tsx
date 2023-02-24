import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootDispatch } from '.';
import { cartItemsFetching, cartItemsFetchingError, cartItemsFetchingSuccess } from './reducers/cartItemsReducer';
import { favoritesFetching, favoritesFetchingError, favoritesFetchingSuccess } from './reducers/favoritesReducer';
import { itemsFetching, itemsFetchingError, itemsFetchingSuccess } from './reducers/itemsReducer';
import { CartItem, Item } from './types';

export const fetchItems = () => async (dispatch: RootDispatch) => {
    try {
        dispatch(itemsFetching())
        const itemsResponce = await axios.get<Item[]>('https://6336bb0765d1e8ef26721a9f.mockapi.io/items')
        dispatch(itemsFetchingSuccess(itemsResponce.data))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(itemsFetchingError(e.message))
        }
    }
}

export const fetchFavorites = () => async (dispatch: RootDispatch) => {
    try {
        dispatch(favoritesFetching())
        const favoritesResponce = await axios.get<CartItem[]>('https://6336bb0765d1e8ef26721a9f.mockapi.io/favorites')
        dispatch(favoritesFetchingSuccess(favoritesResponce.data))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(favoritesFetchingError(e.message))
        }
    }
}

export const fetchCartItems = () => async (dispatch: RootDispatch) => {
    try {
        dispatch(cartItemsFetching())
        const cartItemsResponce = await axios.get<CartItem[]>('https://6336bb0765d1e8ef26721a9f.mockapi.io/cart')
        dispatch(cartItemsFetchingSuccess(cartItemsResponce.data))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(cartItemsFetchingError(e.message))
        }
    }
}

export const removeFavoriteItem = createAsyncThunk(
    'favorites/removeFavoriteItem',
    async function (id: number) {
        await axios.delete<CartItem[]>(`https://6336bb0765d1e8ef26721a9f.mockapi.io/favorites/${id}`)
        return id
    }
)

export const addItemToFavorite = createAsyncThunk(
    'favorites/addItemToFavorite',
    async function (obj: Item) {
        await axios.post<Item>('https://6336bb0765d1e8ef26721a9f.mockapi.io/favorites', obj)
        return obj
    }
)

export const removeCartItem = createAsyncThunk(
    'cartItems/removeCartItem',
    async function (id: number) {
        await axios.delete<CartItem[]>(`https://6336bb0765d1e8ef26721a9f.mockapi.io/cart/${id}`)
        return id
    }
)

export const addItemToCart = createAsyncThunk(
    'cartItems/addItemToCart',
    async function (obj: CartItem) {
        const { data } = await axios.post<CartItem>('https://6336bb0765d1e8ef26721a9f.mockapi.io/cart', obj)
        if (obj.parentId === data.parentId) {
            return {
                ...obj,
                id: data.id
            }
        }
        return obj
    }
)

