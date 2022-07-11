import { SourceData } from '../types/types';
import createCard from './createCard';

export default function render(data: SourceData): void {
    const parent = document.querySelector('.catalog__list') as HTMLElement;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.items.length; i++) {
        const card = createCard(data.items[i]);
        fragment.appendChild(card);
    }

    parent.appendChild(fragment);
}
