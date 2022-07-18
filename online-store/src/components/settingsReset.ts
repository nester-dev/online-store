import { SortOrder, State } from '../types/types';
import filtersReset from './filtersReset';
import { CART_PRICE, CART_TOTAL, DROPDOWNBUTTON, SEARCH_FORM } from '../constants/constants';

export default function settingsReset(currentState: State): void {
    filtersReset(currentState);

    currentState.cartCount = 0;
    currentState.cartItems = [];
    currentState.cartTotalPrice = 0;
    currentState.searchTerm = '';
    currentState.sortOrder = SortOrder.nameAZ;
    localStorage.removeItem('state');

    CART_TOTAL.innerText = '0';
    CART_PRICE.innerText = '0₽';
    DROPDOWNBUTTON.innerText = (document.querySelector(`[data-value=${currentState.sortOrder}]`) as HTMLElement)
        .innerText as string;
    SEARCH_FORM.value = currentState.searchTerm;
}
