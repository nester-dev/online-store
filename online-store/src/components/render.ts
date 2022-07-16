import createCard from './createCard';
import multipleFilter from './multipleFilter';
import { SourceData, State } from '../types/types';
import cardsEvent from './cardsEvent';

export default function render(data: SourceData, currentState: State): void {
    const catalogContent = document.querySelector('.catalog__content') as HTMLElement;
    const parent = document.querySelector('.catalog__list') as HTMLElement;
    const fragment = document.createDocumentFragment();

    const filteredData = multipleFilter(data, currentState);

    if (!filteredData.items.length) {
        catalogContent.removeChild(parent);

        const noCardsText = document.createElement('p');
        const list = document.createElement('div');
        list.classList.add('catalog__list');
        noCardsText.classList.add('catalog__no-cards');
        noCardsText.textContent = 'Извините, совпадений не обнаружено.';

        list.appendChild(noCardsText);
        catalogContent.appendChild(list);
    } else {
        for (let i = 0; i < filteredData.items.length; i++) {
            const card = createCard(filteredData.items[i]);
            const cardName = card.querySelector('.card__title') as HTMLElement;

            if (currentState.cartItems.includes(cardName.innerText)) {
                card.classList.add('card_selected');
                const cardButton = card.querySelector('.card__button') as HTMLElement;
                cardButton.classList.add('card__button_active');
                cardButton.innerText = 'Добавлено!';
            }

            fragment.appendChild(card);
        }

        if (parent) {
            catalogContent.removeChild(parent);
            const list = document.createElement('div');
            list.classList.add('catalog__list');
            list.appendChild(fragment);
            catalogContent.appendChild(list);
        }

        cardsEvent(currentState);
    }
}
