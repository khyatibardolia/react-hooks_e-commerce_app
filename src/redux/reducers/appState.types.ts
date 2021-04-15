import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';

export interface appState {
    products: Array<[]>;
    perPageProducts: ItemslistTypes[];
    cartItems: ItemslistTypes[];
    wishList: ItemslistTypes[];
}
