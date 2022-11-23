export interface IAddProductInterface {
    name: string;
    category: string;
    description: string;
    product_image: string;
    user_id: string;
}

export interface IProductInterface {
    id: number;
    name: string;
    category: string;
    description: string;
    product_image: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
}