import {Category} from "@/types/category";

export interface Product {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    image_url: string;
    hero_image_url: string;
    created_at: string;
    categories: Category[];
    platform: {
        id: string
        name: string
        slug: string
    }
}