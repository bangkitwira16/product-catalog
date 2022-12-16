import { Product } from "./Product";

export interface ResponseData {
    limit: number;
    products: Product[];
    skip: number
}