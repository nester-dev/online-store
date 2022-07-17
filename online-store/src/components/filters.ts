import { CardInfo, SourceData, State } from '../types/types';
import multipleFilter from './multipleFilter';
import { data } from '../constants/constants';
import render from './render';
import filtersReset from './filtersReset';

export default function filtersEvent(currentState: State): void {
    const catalogFilters = document.querySelector('.catalog__filters') as HTMLDivElement;

    if (currentState.type.length) {
        for (let i = 0; i < currentState.type.length; i++) {
            const target = document.querySelector(`[data-value=${currentState.type[i]}]`) as HTMLElement;
            target.classList.add('filter__element_active');
        }
    }

    if (currentState.composition.length) {
        for (let i = 0; i < currentState.composition.length; i++) {
            const target = document.querySelector(`[data-value=${currentState.composition[i]}]`) as HTMLElement;
            target.classList.add('filter__element_active');
        }
    }

    if (currentState.spicy.length) {
        for (let i = 0; i < currentState.spicy.length; i++) {
            const target = document.querySelector(`[data-value=${currentState.spicy[i]}]`) as HTMLElement;
            target.classList.add('filter__element_active');
        }
    }

    catalogFilters.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('filter__element')) {
            target.classList.toggle('filter__element_active');
            const filterType = (target.closest('div') as HTMLDivElement).getAttribute('id') as string;

            target.classList.contains('filter__element_active')
                ? setFilterType(filterType, target, currentState)
                : unsetFilterType(filterType, target, currentState);
        }

        if (target.getAttribute('id') === 'checkbox') {
            currentState.popular = !currentState.popular;
            localStorage.setItem('state', JSON.stringify(currentState));
        }

        if (target.classList.contains('filter-reset')) {
            filtersReset(currentState);
        }

        const filteredData = multipleFilter(data, currentState);
        render(filteredData, currentState);
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
            currentState.spicy.push(dataAttr);
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
            currentState.composition.splice(currentState.composition.indexOf(target.innerText), 1);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;

        case 'spicy':
            currentState.spicy.splice(currentState.spicy.indexOf(dataAttr), 1);
            localStorage.setItem('state', JSON.stringify(currentState));
            break;
    }
}

export function filterByCategory(data: SourceData, currentState: State) {
    const filteredData = data;

    if (currentState.type.length) {
        filteredData.items = filteredData.items.filter((card: CardInfo) => currentState.type.includes(card.type));
    }

    return filteredData;
}

export function filterByCheese(data: SourceData, currentState: State): SourceData {
    const filteredData = data;

    if (currentState.composition.length) {
        filteredData.items = filteredData.items.filter((card: CardInfo) => {
            let isContains = true;

            if (!card.composition) return false;

            for (let i = 0; i < currentState.composition.length; i++) {
                if (-1 === card.composition.indexOf(`сыр ${currentState.composition[i]}`)) {
                    isContains = false;
                    break;
                }
            }

            return isContains;
        });
    }

    return filteredData;
}

export function filterBySpicy(data: SourceData, currentState: State): SourceData {
    const filteredData = data;

    if (currentState.spicy.length) {
        filteredData.items = filteredData.items.filter((card: CardInfo) => {
            let isContains = true;

            for (let i = 0; i < currentState.spicy.length; i++) {
                if (-1 === currentState.spicy.indexOf(card.spicy)) {
                    isContains = false;
                    break;
                }
            }

            return isContains;
        });
    }

    return filteredData;
}

export function filterByPopular(data: SourceData, currentState: State): SourceData {
    const filteredData = data;

    if (currentState.popular) {
        filteredData.items = filteredData.items.filter((card: CardInfo) => card.tag === 'ХИТ');
    }

    return filteredData;
}
