export type Item = {
    title: string,
    price: number,
    imageUrl: string,
    id: number
}

export type CartItem = Item & { parentId: number }
