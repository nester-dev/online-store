import { State } from '../types/types';
import popup from './popup';
import { MAX_CART_COUNT } from '../constants/constants';

export default function toggleCartValue(target: HTMLElement, currentState: State) {
    const cardButton = target.querySelector('.card__button') as HTMLDivElement;
    const cartTotal = document.querySelector('.cart__total') as HTMLElement;
    const cartPrice = document.querySelector('.cart__cost') as HTMLElement;
    const price = (target.querySelector('.card__price') as HTMLElement).innerText.split(' ')[0];
    const cardName = target.querySelector('.card__title') as HTMLElement;
    const currentTotalPrice = cartPrice.innerText.substring(0, cartPrice.innerText.length - 1);

    if (!target.classList.contains('card_selected')) {
        if (currentState.cartCount < MAX_CART_COUNT) {
            target.classList.add('card_selected');
            cardButton.classList.add('card__button_active');
            cardButton.innerText = 'Добавлено!';

            cartPrice.innerText = `${+currentTotalPrice + +price}₽`;
            cartTotal.innerText = (+cartTotal.innerText + 1).toString();
            currentState.cartItems.push(cardName.innerText);
            currentState.cartCount++;
            localStorage.setItem('state', JSON.stringify(currentState));
        } else {
            popup();
        }
    } else {
        target.classList.remove('card_selected');
        cardButton.classList.remove('card__button_active');
        cardButton.innerText = 'Выбрать';

        cartPrice.innerText = `${+currentTotalPrice - +price}₽`;
        cartTotal.innerText = (+cartTotal.innerText - 1).toString();
        const index = currentState.cartItems.indexOf(cardName.innerText);
        currentState.cartItems.splice(index, 1);
        currentState.cartCount--;
        localStorage.setItem('state', JSON.stringify(currentState));
    }
}
