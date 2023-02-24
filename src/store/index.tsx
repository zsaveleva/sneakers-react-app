import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { cartItemsReducer } from "./reducers/cartItemsReducer";
import { itemsReducer } from "./reducers/itemsReducer";
import { favoritesReducer } from "./reducers/favoritesReducer";

const rootReducer = combineReducers({
    items: itemsReducer,
    cartItems: cartItemsReducer,
    favorites: favoritesReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type RootDispatch = typeof store.dispatch
