import { SourceData, State } from '../types/types';
import render from './render';
import multipleFilter from './multipleFilter';
import { data } from '../constants/constants';

export function sort(currentState: State): void {
    const dropdownContent = document.querySelector('.dropdown__content') as HTMLDivElement;
    const dropdownButton = document.querySelector('.dropdown__button') as HTMLButtonElement;
    const dropDown = document.querySelector('.dropdown') as HTMLButtonElement;
    const body = document.body;

    dropDown.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        dropdownContent.classList.add('dropdown__content_show');
        if (target.classList.contains('dropdown__text')) {
            dropdownButton.innerText = target.innerText;
            currentState.sortOrder = target.getAttribute('data-value') as string;
            dropdownContent.classList.remove('dropdown__content_show');

            const filteredData = multipleFilter(data, currentState);
            localStorage.setItem('state', JSON.stringify(currentState));
            render(filteredData, currentState);
        }

        body.addEventListener('click', handler);
    });
}

function handler(event: Event): void {
    const dropdownContent = document.querySelector('.dropdown__content') as HTMLDivElement;
    const body = document.body;
    const target = event.target as HTMLElement;

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
