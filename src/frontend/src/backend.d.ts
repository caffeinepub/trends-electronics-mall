import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface Brand {
    id: bigint;
    logo?: ExternalBlob;
    name: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    isFeatured: boolean;
    category: Category;
    brand: string;
    rating: number;
    image?: ExternalBlob;
    isNew: boolean;
    price: number;
}
export enum Category {
    Accessories = "Accessories",
    Wearables = "Wearables",
    Audio = "Audio",
    Smartphones = "Smartphones",
    LaptopsTablets = "LaptopsTablets"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(productId: bigint): Promise<void>;
    adminAddBrand(name: string, logo: ExternalBlob | null): Promise<bigint>;
    adminAddProduct(product: Product): Promise<bigint>;
    adminDeleteBrand(id: bigint): Promise<void>;
    adminDeleteProduct(id: bigint): Promise<void>;
    adminGetContactMessages(): Promise<Array<ContactMessage>>;
    adminUpdateBrand(id: bigint, name: string, logo: ExternalBlob | null): Promise<void>;
    adminUpdateProduct(id: bigint, product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllBrands(): Promise<Array<Brand>>;
    getAllProducts(): Promise<Array<Product>>;
    getBrandById(id: bigint): Promise<Brand>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product>;
    getProductsByBrand(brand: string): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getProductsSortedByPrice(): Promise<Array<Product>>;
    getStoreName(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(input: {
        name: string;
        email: string;
        message: string;
        phone: string;
    }): Promise<bigint>;
}
