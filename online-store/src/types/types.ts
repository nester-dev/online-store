export interface CardInfo {
    type: string;
    name: string;
    tag?: string;
    composition?: Array<string>;
    price: string;
    spicy: string;
    imageName: string;
    weight: string;
}

export interface SourceData {
    items: Array<CardInfo>;
}

export interface State {
    sortOrder: string;
    type: Array<string>;
    composition: Array<string>;
    spicy: Array<string>;
    searchTerm: string;
    popular: boolean;
    cartCount: number;
    cartTotalPrice: number;
    cartItems: Array<string>;
    minPrice: string;
    maxPrice: string;
    minWeight: string;
    maxWeight: string;
}

export enum SortOrder {
    nameAZ = 'nameAZ',
    nameZA = 'nameZA',
    priceUp = 'priceUp',
    priceDown = 'priceDown',
}

export enum FilterID {
    category = 'category',
    cheese = 'cheese',
    spicy = 'spicy',
}

export enum SliderType {
    price = 'price',
    weight = 'weight',
}
