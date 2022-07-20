import { SliderType, SourceData, State } from '../types/types';
import render from './render';
import { sort } from './sort';
import { searchFormEvent } from './searchForm';
import filtersEvent from './filters';
import { initSlider } from './slider';
import { INPUTS_PRICE, INPUTS_WEIGHT } from '../constants/constants';

export default function init(data: SourceData, currentState: State): void {
    const localStorageState: State = JSON.parse(localStorage.getItem('state') as string);

    if (localStorageState) {
        currentState = localStorageState;
    }

    render(data, currentState);
    sort(currentState);
    searchFormEvent(data, currentState);
    filtersEvent(currentState);
    initSlider(data, currentState, 'filter-price', SliderType.price, INPUTS_PRICE);
    initSlider(data, currentState, 'filter-weight', SliderType.weight, INPUTS_WEIGHT);
}
