import { SourceData, State } from '../types/types';
import render from './render';
import multipleFilter from './multipleFilter';
import { data } from '../constants/constants';

export function sort(currentState: State): void {
    const dropdownButton = document.querySelector('.dropdown__button') as HTMLButtonElement;
    const dropdownContent = document.querySelector('.dropdown__content') as HTMLDivElement;
    const body = document.body;

    if (currentState) {
        dropdownButton.innerText = (document.querySelector(`[data-value=${currentState.sortOrder}]`) as HTMLElement)
            .innerText as string;
    }

    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.add('dropdown__content_show');

        body.addEventListener('click', handler);
    });
}

function handler(event: Event): void {
    const currentState: State = JSON.parse(localStorage.getItem('state') as string);
    const dropdownButton = document.querySelector('.dropdown__button') as HTMLButtonElement;
    const dropdownContent = document.querySelector('.dropdown__content') as HTMLDivElement;
    const body = document.body;
    const target = event.target as HTMLElement;

    if (target.classList.contains('dropdown__text')) {
        dropdownButton.innerText = target.innerText;
        currentState.sortOrder = target.getAttribute('data-value') as string;
        dropdownContent.classList.remove('dropdown__content_show');

        const filteredData = multipleFilter(data, currentState);
        localStorage.setItem('state', JSON.stringify(currentState));
        render(filteredData, currentState);
    }

    if (!target.closest('.dropdown__button')) {
        dropdownContent.classList.remove('dropdown__content_show');
        body.removeEventListener('click', handler);
    }
}

export function getDataBySortType(value: string, data: SourceData): SourceData {
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
