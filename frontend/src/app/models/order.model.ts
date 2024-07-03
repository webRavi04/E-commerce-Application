export interface Order {
    _id: string;
    userId: string;
    products: { productId: string, quantity: number }[];
    totalPrice: number;
    status: string;
    createdAt: Date;
}