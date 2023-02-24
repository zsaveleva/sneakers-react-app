import React, { FC, useState, } from "react";
import ContentLoader from "react-content-loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { CartItem, Item } from "../../store/types";
import { addItemToCart, addItemToFavorite, removeCartItem, removeFavoriteItem } from "../../store/asyncActions";

import styles from './Card.module.scss';

interface CardProps extends Item {
    favorited?: boolean
    loading: boolean
}

export const Card: FC<CardProps> = ({
    id,
    title,
    price,
    imageUrl,
    loading,
    favorited = false
}): JSX.Element => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cartItems.cartItems)
    const favorites = useAppSelector(state => state.favorites.favorites)

    const [isFavorite, setIsFavorite] = useState<boolean>(favorited)

    const isItemAdded = (id: number) => {
        return cartItems.some((obj) => obj.parentId === id)
    };

    const obj: CartItem = { id, parentId: id, title, imageUrl, price }

    const onAddToCart = (obj: CartItem) => {
        try {
            const findItem = cartItems.find((item) => item.parentId === obj.id)
            if (findItem) {
                dispatch(removeCartItem(findItem.id))
            } else {
                dispatch(addItemToCart(obj))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onClickFavorite = (obj: Item) => {
        try {
            const findItem = favorites.find((favObj) => favObj.id === obj.id)
            if (findItem) {
                dispatch(removeFavoriteItem(obj.id))
            } else {
                dispatch(addItemToFavorite(obj))
            }
            setIsFavorite(!isFavorite)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.card}>
            {
                loading ?
                    (
                        <ContentLoader
                            speed={2}
                            width={160}
                            height={250}
                            viewBox="0 0 155 265"
                            backgroundColor="#f3f3f3"
                        >
                            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
                            <rect x="0" y="171" rx="0" ry="0" width="1" height="0" />
                            <rect x="0" y="167" rx="3" ry="3" width="155" height="15" />
                            <rect x="0" y="187" rx="3" ry="3" width="100" height="15" />
                            <rect x="0" y="234" rx="8" ry="8" width="80" height="25" />
                            <rect x="124" y="232" rx="8" ry="8" width="32" height="32" />
                        </ContentLoader>
                    ) : (
                        <>
                            <div className={styles.favorite} onClick={() => onClickFavorite(obj)}>
                                {
                                    isFavorite ?
                                        (
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="32" height="32" rx="7" fill="#FEF0F0" />
                                                <path d="M19.2082 10.1182C18.5514 10.1284 17.9088 10.3118 17.3455 10.6498C16.7822 10.9878 16.318 11.4684 15.9999 12.0432C15.6818 11.4684 15.2176 10.9878 14.6543 10.6498C14.091 10.3118 13.4484 10.1284 12.7916 10.1182C11.7444 10.1637 10.7579 10.6218 10.0474 11.3924C9.33698 12.1629 8.96037 13.1834 8.99989 14.2307C8.99989 16.8831 11.7917 19.78 14.1332 21.7441C14.656 22.1834 15.317 22.4242 15.9999 22.4242C16.6828 22.4242 17.3438 22.1834 17.8666 21.7441C20.2081 19.78 22.9999 16.8831 22.9999 14.2307C23.0394 13.1834 22.6628 12.1629 21.9524 11.3924C21.2419 10.6218 20.2553 10.1637 19.2082 10.1182Z" fill="url(#paint0_linear_1004_8)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_1004_8" x1="15.9999" y1="10.1182" x2="15.9999" y2="22.4242" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#FFB0B0" />
                                                        <stop offset="1" stop-color="#FF4343" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        ) : (
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" fill="white" stroke="#F8F8F8" />
                                                <path d="M19.2112 10C18.5543 10.0102 17.9118 10.1936 17.3484 10.5316C16.7851 10.8696 16.321 11.3502 16.0028 11.925C15.6847 11.3502 15.2205 10.8696 14.6572 10.5316C14.0939 10.1936 13.4514 10.0102 12.7945 10C11.7474 10.0455 10.7608 10.5036 10.0504 11.2741C9.33991 12.0447 8.9633 13.0651 9.00282 14.1125C9.00282 16.7649 11.7947 19.6617 14.1362 21.6258C14.659 22.0652 15.3199 22.306 16.0028 22.306C16.6857 22.306 17.3467 22.0652 17.8695 21.6258C20.211 19.6617 23.0028 16.7649 23.0028 14.1125C23.0423 13.0651 22.6657 12.0447 21.9553 11.2741C21.2448 10.5036 20.2583 10.0455 19.2112 10ZM17.1199 20.7333C16.8072 20.9966 16.4116 21.141 16.0028 21.141C15.5941 21.141 15.1984 20.9966 14.8857 20.7333C11.8886 18.2186 10.1695 15.8059 10.1695 14.1125C10.1296 13.3744 10.3832 12.6505 10.875 12.0987C11.3667 11.5468 12.0567 11.2118 12.7945 11.1667C13.5323 11.2118 14.2223 11.5468 14.714 12.0987C15.2058 12.6505 15.4594 13.3744 15.4195 14.1125C15.4195 14.2672 15.4809 14.4156 15.5903 14.525C15.6997 14.6344 15.8481 14.6958 16.0028 14.6958C16.1575 14.6958 16.3059 14.6344 16.4153 14.525C16.5247 14.4156 16.5862 14.2672 16.5862 14.1125C16.5463 13.3744 16.7999 12.6505 17.2916 12.0987C17.7834 11.5468 18.4734 11.2118 19.2112 11.1667C19.9489 11.2118 20.6389 11.5468 21.1307 12.0987C21.6224 12.6505 21.876 13.3744 21.8362 14.1125C21.8362 15.8059 20.1171 18.2186 17.1199 20.731V20.7333Z" fill="#D9D9D9" />
                                            </svg>

                                        )
                                }
                            </div>
                            <img width='100%' height={135} src={imageUrl} alt="Sneakers" />
                            <h5>{title}</h5>
                            <div className='d-flex justify-between align-center'>
                                <div className='d-flex flex-column'>
                                    <span>Цена: </span>
                                    <b>{price} руб.</b>
                                </div>
                                <img
                                    className={styles.plus}
                                    onClick={() => onAddToCart(obj)}
                                    src={isItemAdded(id)
                                        ? '/img/btn-checked.svg'
                                        : '/img/btn-plus.svg'}
                                    alt='Plus'
                                />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

