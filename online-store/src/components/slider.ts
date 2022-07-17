import * as noUiSlider from 'nouislider';
import { SourceData, State } from '../types/types';
import { INPUT1, INPUT2, INPUT3, INPUT4, INPUTS_PRICE, INPUTS_WEIGHT } from '../constants/constants';
import multipleFilter from './multipleFilter';
import render from './render';

export function priceSlider(data: SourceData, currentState: State) {
    const priceSlider = document.getElementById('filter-price') as noUiSlider.target;
    const minPrice = getMin(data, 'price');
    const maxPrice = getMax(data, 'price');

    INPUT1.setAttribute('min', minPrice);
    INPUT1.setAttribute('placeholder', minPrice);
    INPUT2.setAttribute('min', minPrice);

    INPUT1.setAttribute('max', maxPrice);
    INPUT2.setAttribute('placeholder', maxPrice);
    INPUT2.setAttribute('max', maxPrice);

    noUiSlider.create(priceSlider, {
        start: [minPrice, maxPrice],
        connect: true,
        step: 1,
        range: {
            min: [+minPrice],
            max: [+maxPrice],
        },

        format: {
            to: function (value) {
                return Math.floor(value);
            },
            from: function (value) {
                return parseInt(value);
            },
        },
    });

    priceSlider.noUiSlider?.on('update', function (values: (number | string)[], handle: number) {
        INPUTS_PRICE[handle].value = values[handle] as string;
        currentState.minPrice = INPUTS_PRICE[0].value;
        currentState.maxPrice = INPUTS_PRICE[1].value;
        localStorage.setItem('state', JSON.stringify(currentState));

        const filteredData = multipleFilter(data, currentState);
        render(filteredData, currentState);
    });

    INPUTS_PRICE.forEach((input, index) => {
        input.addEventListener('change', (event: Event) => {
            setRangeSlider(index, (event.currentTarget as HTMLInputElement).value, priceSlider);
        });
    });
}

export function weightSlider(data: SourceData, currentState: State) {
    const weightSlider = document.getElementById('filter-weight') as noUiSlider.target;
    const minWeight = getMin(data, 'weight');
    const maxWeight = getMax(data, 'weight');

    INPUT3.setAttribute('min', minWeight);
    INPUT3.setAttribute('placeholder', minWeight);
    INPUT4.setAttribute('min', minWeight);

    INPUT3.setAttribute('max', maxWeight);
    INPUT4.setAttribute('placeholder', maxWeight);
    INPUT4.setAttribute('max', maxWeight);

    noUiSlider.create(weightSlider, {
        start: [minWeight, maxWeight],
        connect: true,
        step: 10,
        range: {
            min: [+minWeight],
            max: [+maxWeight],
        },

        format: {
            to: function (value) {
                return Math.floor(value);
            },
            from: function (value) {
                return parseInt(value);
            },
        },
    });

    weightSlider.noUiSlider?.on('update', function (values: (number | string)[], handle: number) {
        INPUTS_WEIGHT[handle].value = values[handle] as string;
        currentState.minWeight = INPUTS_WEIGHT[0].value;
        currentState.maxWeight = INPUTS_WEIGHT[1].value;
        localStorage.setItem('state', JSON.stringify(currentState));

        const filteredData = multipleFilter(data, currentState);
        render(filteredData, currentState);
    });

    INPUTS_WEIGHT.forEach((input, index) => {
        input.addEventListener('change', (event: Event) => {
            setRangeSlider(index, (event.currentTarget as HTMLInputElement).value, weightSlider);
        });
    });
}

function getMin(data: SourceData, attr: string) {
    let min = Infinity;

    data.items.forEach((card) => {
        switch (attr) {
            case 'price':
                if (+card['price'] < min) {
                    min = +card.price;
                }
                break;

            case 'weight':
                if (+card['weight'] < min) {
                    min = +card.weight;
                }
                break;
        }
    });

    return min.toString();
}

function getMax(data: SourceData, attr: string) {
    let max = -Infinity;

    data.items.forEach((card) => {
        switch (attr) {
            case 'price':
                if (+card.price > max) {
                    max = +card.price;
                }
                break;

            case 'weight':
                if (+card.weight > max) {
                    max = +card.weight;
                }
                break;
        }
    });

    return max.toString();
}

function setRangeSlider(index: number, value: string, slider: noUiSlider.target) {
    const array = [];
    array[index] = value;

    slider.noUiSlider?.set(array);
}

export function priceSliderFilter(data: SourceData, currentState: State) {
    const filteredData = data;

    if (currentState.minPrice.length && currentState.maxPrice.length) {
        filteredData.items = filteredData.items.filter(
            (card) => +card.price >= +currentState.minPrice && +card.price <= +currentState.maxPrice
        );
    }

    return filteredData;
}

export function weightSliderFilter(data: SourceData, currentState: State) {
    const filteredData = data;

    if (currentState.minWeight.length && currentState.maxWeight.length) {
        filteredData.items = filteredData.items.filter(
            (card) => +card.weight >= +currentState.minWeight && +card.weight <= +currentState.maxWeight
        );
    }

    return filteredData;
}
