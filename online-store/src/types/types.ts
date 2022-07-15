export interface CardInfo {
    type: string;
    name: string;
    tag?: string;
    composition?: Array<string>;
    price: string;
    imageName: string;
}

export interface SourceData {
    items: Array<CardInfo>;
}

export interface State {
    sortOrder: string;
    type?: string;
    composition?: Array<string>;
    spicy?: string;
    search?: string;
}
