import React, { FC } from "react";
import { Card } from "../components/Card";
import { useAppSelector } from "../store/hooks/hooks";
import { Item } from "../store/types";

export const Favorites: FC = () => {
    const favorites = useAppSelector(state => state.favorites.favorites)
    const isLoading = useAppSelector(state => state.favorites.isLoading)

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои закладки</h1>
            </div>
            <div className='d-flex flex-wrap justify-center'>
                {favorites.map((item: Item) => (
                    <Card
                        key={item.id}
                        favorited={true}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}