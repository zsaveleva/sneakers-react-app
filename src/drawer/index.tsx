import React, { FC, useState } from "react";
import axios from "axios";
import { CardInCart } from "../components/CardInCart";
import { Info } from "../components/Info";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { cleanCart, onCloseCart } from "../store/reducers/cartItemsReducer";

import styles from './Drawer.module.scss';

const delay = () => new Promise(resolve => setTimeout(resolve, 1000))

export const Drawer: FC = () => {
    const [orderId, setOrderId] = useState<string>('0')
    const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const totalPrice = useAppSelector(state => state.cartItems.totalPrice)
    const cartState = useAppSelector(state => state.cartItems.cartState)
    const cartItems = useAppSelector(state => state.cartItems.cartItems)
    const dispatch = useAppDispatch()

    const clean = () => {
        dispatch(cleanCart())
    }

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://6336bb0765d1e8ef26721a9f.mockapi.io/orders', {
                items: cartItems
            })
            setOrderId(data.id)
            setIsOrderComplete(true)
            clean()

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.put(`https://6336bb0765d1e8ef26721a9f.mockapi.io/cart/${item.id}`, [])
                await delay()
            }
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${cartState ? styles.overlayVisible : ''}`} onClick={() => dispatch(onCloseCart())}>
            <div className={styles.drawer} onClick={e => e.stopPropagation()}>
                <h2 className='d-flex justify-between mb-30'>
                    Корзина
                    <svg onClick={() => dispatch(onCloseCart())} className='removeBtn  cu-p' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB" />
                        <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5" />
                    </svg>
                </h2>

                {
                    cartItems.length > 0 ? (
                        <div className="d-flex flex-column flex">
                            <div className="items flex">
                                {cartItems.map((obj) => {
                                    return (
                                        <CardInCart
                                            key={obj.id}
                                            title={obj.title}
                                            imageUrl={obj.imageUrl}
                                            price={obj.price}
                                            id={obj.id}
                                        />
                                    )
                                })}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{(totalPrice / 100 * 5).toFixed(0)} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>
                                    Оформить заказ
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Info
                            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан в курьерскую службу` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'}
                            imgSrc={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                        />
                    )
                }
            </div>
        </div>
    )
}