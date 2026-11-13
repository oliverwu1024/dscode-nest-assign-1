export enum Category {
    Electronics = "Electronics",
    Clothing = "Clothing",
    Food = "Food",
    Books = "Books"
}

export type OrderStatus = "failed" | "pending" | "delivered" | "completed";

export interface Order {
    id: string;
    userId: string;
    customer: string;
    category: Category;
    product: string;
    quantity: number;
    status: OrderStatus;
}