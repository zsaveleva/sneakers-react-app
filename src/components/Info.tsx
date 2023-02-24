import React, { FC } from 'react';
import { useAppDispatch } from '../store/hooks/hooks';
import { onCloseCart } from '../store/reducers/cartItemsReducer';

interface InfoProps {
    title: string
    description: string
    imgSrc: string
}

export const Info: FC<InfoProps> = ({ title, imgSrc, description }): JSX.Element => {
    const dispatch = useAppDispatch()

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} src={imgSrc} alt="empty-cart" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => dispatch(onCloseCart())} className='greenButton'>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Вернуться назад
            </button>
        </div>
    )
}
