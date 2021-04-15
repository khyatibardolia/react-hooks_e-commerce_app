export interface ItemslistTypes {
    uuid: number;
    cover_image_url: string;
    title: number;
    description: number;
    discount: number;
    quantity?: number;
    isFavorite?: boolean;
    itemAddedToCart?: boolean;
    net_price: { formatted_value: string };
    retail_price: { formatted_value: string };
    subTotal?: number;
}
