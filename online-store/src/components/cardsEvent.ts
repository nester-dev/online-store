import toggleCartValue from './toggleCartValue';
import { State } from '../types/types';

export default function cardsEvent(currentState: State) {
    const cards = document.querySelectorAll('.card') as NodeList;
    const cartTotal = document.querySelector('.cart__total') as HTMLElement;
    const cartPrice = document.querySelector('.cart__cost') as HTMLElement;

    if (currentState.cartCount > 0 && currentState.cartTotalPrice > 0) {
        cartTotal.innerText = currentState.cartCount.toString();
        cartPrice.innerText = `${currentState.cartTotalPrice.toString()}₽`;
    }

    cards.forEach((card) => {
        card.addEventListener('click', (event: Event) => {
            const target = event.currentTarget as HTMLElement;

            toggleCartValue(target, currentState);
        });
    });
}
