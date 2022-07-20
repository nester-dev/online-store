import { State } from '../types/types';
import popup from './popup';
import { CART_PRICE, CART_TOTAL, MAX_CART_COUNT } from '../constants/constants';

export default function toggleCartValue(target: HTMLElement, currentState: State): void {
    const cardButton = target.querySelector('.card__button') as HTMLDivElement;
    const price = (target.querySelector('.card__price') as HTMLElement).innerText.split(' ')[0];
    const cardName = target.querySelector('.card__title') as HTMLElement;
    const currentTotalPrice = CART_PRICE.innerText.substring(0, CART_PRICE.innerText.length - 1);

    if (!target.classList.contains('card_selected')) {
        if (currentState.cartCount < MAX_CART_COUNT) {
            target.classList.add('card_selected');
            cardButton.classList.add('card__button_active');
            cardButton.innerText = 'Добавлено!';

            const newPrice = +currentTotalPrice + +price;
            CART_PRICE.innerText = `${newPrice}₽`;
            CART_TOTAL.innerText = (+CART_TOTAL.innerText + 1).toString();
            currentState.cartItems.push(cardName.innerText);
            currentState.cartCount++;
            currentState.cartTotalPrice = newPrice;
            localStorage.setItem('state', JSON.stringify(currentState));
        } else {
            popup();
        }
    } else {
        target.classList.remove('card_selected');
        cardButton.classList.remove('card__button_active');
        cardButton.innerText = 'Выбрать';

        const newPrice = +currentTotalPrice - +price;
        CART_PRICE.innerText = `${newPrice}₽`;
        CART_TOTAL.innerText = (+CART_TOTAL.innerText - 1).toString();
        const index = currentState.cartItems.indexOf(cardName.innerText);
        currentState.cartItems.splice(index, 1);
        currentState.cartCount--;
        currentState.cartTotalPrice = newPrice;
        localStorage.setItem('state', JSON.stringify(currentState));
    }
}
