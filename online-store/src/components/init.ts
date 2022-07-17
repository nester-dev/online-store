import { SourceData, State } from '../types/types';
import render from './render';
import { sort } from './sort';
import { searchFormEvent } from './searchForm';
import filtersEvent from './filters';
import { priceSlider, weightSlider } from './slider';

export default function init(data: SourceData, currentState: State) {
    const localStorageState: State = JSON.parse(localStorage.getItem('state') as string);

    if (localStorageState) {
        currentState = localStorageState;
    }

    render(data, currentState);
    sort(currentState);
    searchFormEvent(data, currentState);
    filtersEvent(currentState);
    priceSlider(data, currentState);
    weightSlider(data, currentState);
}
