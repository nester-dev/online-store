import { SourceData } from '../types/types';
import { data } from '../constants/constants';
import render from './render';

export function sort(): void {
    const dropdownButton = document.querySelector('.dropdown__button') as HTMLButtonElement;
    const dropdownContent = document.querySelector('.dropdown__content') as HTMLDivElement;
    const body = document.body;

    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.add('dropdown__content_show');

        body.addEventListener('click', handler);

        function handler(event: Event) {
            const target = event.target as HTMLElement;

            if (target.classList.contains('dropdown__text')) {
                dropdownButton.innerText = target.innerText;
                const value = target.getAttribute('data-value') as string;
                localStorage.setItem('sortOrder', value);
                dropdownContent.classList.remove('dropdown__content_show');

                let filteredData = data;
                filteredData = getDataBySortType(value, filteredData);
                render(filteredData);
            }

            if (!target.closest('.dropdown__button')) {
                dropdownContent.classList.remove('dropdown__content_show');
                body.removeEventListener('click', handler);
            }
        }
    });
}

function getDataBySortType(value: string, data: SourceData): SourceData {
    const sortedData = data;

    switch (value) {
        case 'nameAZ':
            sortedData.items = sortedData.items.sort((elem1, elem2) => elem1.name.localeCompare(elem2.name));
            break;

        case 'nameZA':
            sortedData.items = sortedData.items.sort((elem1, elem2) => elem2.name.localeCompare(elem1.name));
            break;

        case 'priceUp':
            sortedData.items = sortedData.items.sort((elem1, elem2) => +elem1.price - +elem2.price);
            break;

        case 'priceDown':
            sortedData.items = sortedData.items.sort((elem1, elem2) => +elem2.price - +elem1.price);
            break;
    }
    return sortedData;
}
