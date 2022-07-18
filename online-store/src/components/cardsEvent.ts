import toggleCartValue from './toggleCartValue';
import { State } from '../types/types';
import { CART_PRICE, CART_TOTAL, ZERO } from '../constants/constants';

export default function cardsEvent(currentState: State): void {
    const cards = document.querySelectorAll('.card') as NodeList;

    if (currentState.cartCount > ZERO && currentState.cartTotalPrice > ZERO) {
        CART_TOTAL.innerText = currentState.cartCount.toString();
        CART_PRICE.innerText = `${currentState.cartTotalPrice.toString()}₽`;
    }

    cards.forEach((card: Node) => {
        card.addEventListener('click', (event: Event) => {
            const target = event.currentTarget as HTMLElement;

            toggleCartValue(target, currentState);
        });
    });
}
