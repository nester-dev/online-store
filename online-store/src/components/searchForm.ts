import render from './render';
import { SourceData, State } from '../types/types';
import multipleFilter from './multipleFilter';
import { SEARCH_FORM } from '../constants/constants';

export function searchFormEvent(data: SourceData, currentState: State): void {
    const searchClose = document.querySelector('.search-form__close') as HTMLSpanElement;
    SEARCH_FORM.focus();
    SEARCH_FORM.select();

    searchClose.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('search-form__close-active')) {
            searchClose.classList.remove('search-form__close-active');
            currentState.searchTerm = '';
            SEARCH_FORM.value = '';
            localStorage.setItem('state', JSON.stringify(currentState));

            const filteredData = multipleFilter(data, currentState);
            render(filteredData, currentState);
        }
    });

    SEARCH_FORM.addEventListener('input', (event: Event) => {
        const value = (event.target as HTMLInputElement).value.trim();
        if (value.length) {
            searchClose.classList.add('search-form__close-active');
        } else {
            searchClose.classList.remove('search-form__close-active');
        }
        currentState.searchTerm = value.toLowerCase();
        localStorage.setItem('state', JSON.stringify(currentState));

        const filteredData = multipleFilter(data, currentState);
        render(filteredData, currentState);
    });
}

export function searchMatches(value: string, data: SourceData): SourceData {
    const filteredData = data;

    if (value !== '') {
        filteredData.items = filteredData.items.filter((card) => card.name.toLowerCase().includes(value));
    }

    return filteredData;
}
