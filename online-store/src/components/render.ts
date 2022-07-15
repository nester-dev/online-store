import { SourceData } from '../types/types';
import createCard from './createCard';

export default function render(data: SourceData): void {
    const catalogContent = document.querySelector('.catalog__content') as HTMLElement;
    const parent = document.querySelector('.catalog__list') as HTMLElement;
    const fragment = document.createDocumentFragment();

    if (!data.items.length) {
        const noCardsText = document.createElement('p');
        noCardsText.classList.add('catalog__no-cards');
        noCardsText.textContent = 'Извините, совпадений не обнаружено.';

        parent.appendChild(noCardsText);
    } else {
        for (let i = 0; i < data.items.length; i++) {
            const card = createCard(data.items[i]);
            fragment.appendChild(card);
        }

        if (parent) {
            catalogContent.removeChild(parent);
            const list = document.createElement('div');
            list.classList.add('catalog__list');
            list.appendChild(fragment);
            catalogContent.appendChild(list);
        }
    }
}
