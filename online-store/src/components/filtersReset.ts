import { State } from '../types/types';
import { MIN_PRICE_INPUT, MAX_PRICE_INPUT, MIN_WEIGHT_INPUT, MAX_WEIGHT_INPUT } from '../constants/constants';
import * as noUiSlider from 'nouislider';

export default function filtersReset(currentState: State): void {
    const activeFilters = document.querySelectorAll('.filter__element_active');
    const priceSlider = document.getElementById('filter-price') as noUiSlider.target;
    const weightSlider = document.getElementById('filter-weight') as noUiSlider.target;
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    const minPrice = MIN_PRICE_INPUT.getAttribute('min') as string;
    const maxPrice = MAX_PRICE_INPUT.getAttribute('max') as string;
    const minWeight = MIN_WEIGHT_INPUT.getAttribute('min') as string;
    const maxWeight = MAX_WEIGHT_INPUT.getAttribute('max') as string;

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
