import render from './render';
import { SourceData, State } from '../types/types';
import multipleFilter from './multipleFilter';

export function searchFormEvent(data: SourceData, currentState: State) {
    const searchForm = document.querySelector('.search-form__input') as HTMLInputElement;
    searchForm.focus();
    searchForm.select();

    searchForm.addEventListener('input', (event: Event) => {
        const value = (event.target as HTMLInputElement).value.trim();
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
