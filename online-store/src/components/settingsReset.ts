import { State } from '../types/types';
import filtersReset from './filtersReset';
import { DROPDOWNBUTTON } from '../constants/constants';

export default function settingsReset(currentState: State): void {
    const cartTotal = document.querySelector('.cart__total') as HTMLElement;
    const cartPrice = document.querySelector('.cart__cost') as HTMLElement;
    const searchForm = document.querySelector('.search-form__input') as HTMLInputElement;

    filtersReset(currentState);

    currentState.cartCount = 0;
    currentState.cartItems = [];
    currentState.cartTotalPrice = 0;
    currentState.searchTerm = '';
    currentState.sortOrder = 'nameAZ';
    localStorage.removeItem('state');

    cartTotal.innerText = '0';
    cartPrice.innerText = '0₽';
    DROPDOWNBUTTON.innerText = (document.querySelector(`[data-value=${currentState.sortOrder}]`) as HTMLElement)
        .innerText as string;
    searchForm.value = currentState.searchTerm;
}
