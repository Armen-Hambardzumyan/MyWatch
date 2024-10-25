export interface Product {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: number;
    sizes: string[];
}

export interface CartItem extends Product {
    quantity: number;
    size: string
}
