import { CardInfo, FilterID, SourceData, State } from '../types/types';
import multipleFilter from './multipleFilter';
import { DATA } from '../constants/constants';
import render from './render';
import filtersReset from './filtersReset';
import settingsReset from './settingsReset';

export default function filtersEvent(currentState: State): void {
    const catalogFilters = document.querySelector('.catalog__filters') as HTMLDivElement;

    checkCurrentState(currentState.type);
    checkCurrentState(currentState.composition);
    checkCurrentState(currentState.spicy);

    catalogFilters.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('filter__element')) {
            target.classList.toggle('filter__element_active');
            const filterType = (target.closest('div') as HTMLDivElement).getAttribute('id') as string;
            const isActive = target.classList.contains('filter__element_active');

            toggleFilterType(filterType, target, currentState, isActive);
        }

        if (target.getAttribute('id') === 'checkbox') {
            currentState.popular = !currentState.popular;
            localStorage.setItem('state', JSON.stringify(currentState));
        }

        if (target.classList.contains('reset-filter')) {
            filtersReset(currentState);
        }

        if (target.classList.contains('reset-settings')) {
            settingsReset(currentState);
            render(DATA, currentState);
        }

        const filteredData = multipleFilter(DATA, currentState);
        render(filteredData, currentState);
    });
}

function checkCurrentState(element: Array<string>) {
    for (let i = 0; i < element.length; i++) {
        const target = document.querySelector(`[data-value=${element[i]}]`) as HTMLElement;
        target.classList.add('filter__element_active');
    }
}

function toggleFilterType(filterType: string, target: HTMLElement, currentState: State, isActive: boolean): void {
    const dataAttr = target.getAttribute('data-value') as string;
    switch (filterType) {
        case FilterID.category:
            isActive
                ? currentState.type.push(dataAttr)
                : currentState.type.splice(currentState.type.indexOf(dataAttr), 1);
            break;

        case FilterID.cheese:
            isActive
                ? currentState.composition.push(target.innerText)
                : currentState.composition.splice(currentState.composition.indexOf(target.innerText), 1);
            break;

        case FilterID.spicy:
            isActive
                ? currentState.spicy.push(dataAttr)
                : currentState.spicy.splice(currentState.spicy.indexOf(dataAttr), 1);
            break;
    }
    localStorage.setItem('state', JSON.stringify(currentState));
}

export function filterByCategory(data: SourceData, currentState: State): SourceData {
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
                if (card.composition.indexOf(`сыр ${currentState.composition[i]}`) === -1) {
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
                if (currentState.spicy.indexOf(card.spicy) === -1) {
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
