import { SourceData, State } from '../types/types';
import multipleFilter from './multipleFilter';
import { data } from '../constants/constants';
import render from './render';

export default function filtersEvent(currentState: State): void {
    const catalogFilters = document.querySelector('.catalog__filters') as HTMLDivElement;

    catalogFilters.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('filter__element')) {
            target.classList.toggle('filter__element_active');
            const filterType = (target.closest('div') as HTMLDivElement).getAttribute('id') as string;

            target.classList.contains('filter__element_active')
                ? setFilterType(filterType, target, currentState)
                : unsetFilterType(filterType, target, currentState);

            const filteredData = multipleFilter(data, currentState);
            render(filteredData, currentState);
        }
    });
}

function setFilterType(filterType: string, target: HTMLElement, currentState: State): void {
    const dataAttr = target.getAttribute('data-value') as string;
    switch (filterType) {
        case 'category':
            currentState.type.push(dataAttr);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;

        case 'cheese':
            currentState.composition.push(target.innerText);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;

        case 'spicy':
            currentState.spicy.push(target.getAttribute('data-value') as string);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;
    }
}

function unsetFilterType(filterType: string, target: HTMLElement, currentState: State): void {
    const dataAttr = target.getAttribute('data-value') as string;
    switch (filterType) {
        case 'category':
            currentState.type.splice(currentState.type.indexOf(dataAttr), 1);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;

        case 'cheese':
            currentState.composition.splice(currentState.type.indexOf(target.innerText), 1);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;

        case 'spicy':
            currentState.spicy.splice(currentState.type.indexOf(dataAttr), 1);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;
    }
}

export function filterByCategory(data: SourceData, currentState: State) {
    const filteredData = data;

    if (currentState.type.length) {
        filteredData.items = filteredData.items.filter((card) => currentState.type.includes(card.type));
    }

    return filteredData;
}
