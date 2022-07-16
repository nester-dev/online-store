import toggleCartValue from './toggleCartValue';
import { State } from '../types/types';

export default function cardsEvent(currentState: State) {
    const cards = document.querySelectorAll('.card') as NodeList;

    cards.forEach((card) => {
        card.addEventListener('click', (event: Event) => {
            const target = event.currentTarget as HTMLElement;

            toggleCartValue(target, currentState);
        });
    });
}
