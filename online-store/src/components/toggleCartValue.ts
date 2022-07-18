import { State } from '../types/types';
import popup from './popup';
import { CART_PRICE, CART_TOTAL, MAX_CART_COUNT, ONE, ZERO } from '../constants/constants';

export default function toggleCartValue(target: HTMLElement, currentState: State): void {
    const cardButton = target.querySelector('.card__button') as HTMLDivElement;
    const price = (target.querySelector('.card__price') as HTMLElement).innerText.split(' ')[ZERO];
    const cardName = target.querySelector('.card__title') as HTMLElement;
    const currentTotalPrice = CART_PRICE.innerText.substring(ZERO, CART_PRICE.innerText.length - ONE);

    if (!target.classList.contains('card_selected')) {
        if (currentState.cartCount < MAX_CART_COUNT) {
            target.classList.add('card_selected');
            cardButton.classList.add('card__button_active');
            cardButton.innerText = 'Добавлено!';

            const newPrice = +currentTotalPrice + +price;
            CART_PRICE.innerText = `${newPrice}₽`;
            CART_TOTAL.innerText = (+CART_TOTAL.innerText + ONE).toString();
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
        CART_TOTAL.innerText = (+CART_TOTAL.innerText - ONE).toString();
        const index = currentState.cartItems.indexOf(cardName.innerText);
        currentState.cartItems.splice(index, ONE);
        currentState.cartCount--;
        currentState.cartTotalPrice = newPrice;
        localStorage.setItem('state', JSON.stringify(currentState));
    }
}
