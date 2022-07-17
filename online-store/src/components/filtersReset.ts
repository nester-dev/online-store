import { State } from '../types/types';

export default function filtersReset(currentState: State) {
    const activeFilters = document.querySelectorAll('.filter__element_active');
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;

    activeFilters.forEach((elem) => elem.classList.remove('filter__element_active'));
    checkbox.checked = false;

    currentState.type = [];
    currentState.composition = [];
    currentState.spicy = [];
    currentState.popular = false;
    localStorage.setItem('state', JSON.stringify(currentState));
}
