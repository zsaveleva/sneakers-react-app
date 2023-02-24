import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { Item } from "../store/types";

export const Orders: FC = () => {
    const [orders, setOrders] = useState<Item[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get<Item[]>('https://6336bb0765d1e8ef26721a9f.mockapi.io/orders')
                setOrders(data.reduce((prev: Item[], obj: any) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>
            <div className='d-flex flex-wrap justify-center'>
                {(isLoading ? [...Array(8)] : orders).map((item: Item, index: number) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}