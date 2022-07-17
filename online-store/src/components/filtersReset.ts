import { State } from '../types/types';
import { INPUT1, INPUT2, INPUT3, INPUT4 } from '../constants/constants';
import * as noUiSlider from 'nouislider';

export default function filtersReset(currentState: State) {
    const activeFilters = document.querySelectorAll('.filter__element_active');
    const priceSlider = document.getElementById('filter-price') as noUiSlider.target;
    const weightSlider = document.getElementById('filter-weight') as noUiSlider.target;
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    const minPrice = INPUT1.getAttribute('min') as string;
    const maxPrice = INPUT2.getAttribute('max') as string;
    const minWeight = INPUT3.getAttribute('min') as string;
    const maxWeight = INPUT4.getAttribute('max') as string;

    activeFilters.forEach((elem) => elem.classList.remove('filter__element_active'));
    checkbox.checked = false;

    currentState.type = [];
    currentState.composition = [];
    currentState.spicy = [];
    currentState.popular = false;
    currentState.minPrice = minPrice;
    currentState.maxPrice = maxPrice;
    currentState.minWeight = minWeight;
    currentState.maxWeight = maxWeight;
    priceSlider.noUiSlider?.set([minPrice, maxPrice]);
    weightSlider.noUiSlider?.set([minWeight, maxWeight]);
    localStorage.setItem('state', JSON.stringify(currentState));
}
