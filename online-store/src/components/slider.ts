import * as noUiSlider from 'nouislider';
import { SourceData, State } from '../types/types';
import { INPUT1, INPUT2, INPUTS } from '../constants/constants';
import multipleFilter from './multipleFilter';
import render from './render';

export default function filterPrice(data: SourceData, currentState: State) {
    const rangeSlider = document.getElementById('filter-price') as noUiSlider.target;
    const minPrice = getMinPrice(data);
    const maxPrice = getMaxPrice(data);

    INPUT1.setAttribute('min', minPrice);
    INPUT2.setAttribute('placeholder', minPrice);
    INPUT2.setAttribute('min', minPrice);

    INPUT1.setAttribute('max', maxPrice);
    INPUT2.setAttribute('placeholder', maxPrice);
    INPUT2.setAttribute('max', maxPrice);

    noUiSlider.create(rangeSlider, {
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

    rangeSlider.noUiSlider?.on('update', function (values: (number | string)[], handle: number) {
        INPUTS[handle].value = values[handle] as string;
        currentState.minPrice = INPUTS[0].value;
        currentState.maxPrice = INPUTS[1].value;
        localStorage.setItem('state', JSON.stringify(currentState));

        const filteredData = multipleFilter(data, currentState);
        render(filteredData, currentState);
    });

    INPUTS.forEach((input, index) => {
        input.addEventListener('change', (event: Event) => {
            setRangeSlider(index, (event.currentTarget as HTMLInputElement).value, rangeSlider);
        });
    });
}

function getMinPrice(data: SourceData) {
    let min = Infinity;

    data.items.forEach((card) => {
        if (+card.price < min) {
            min = +card.price;
        }
    });

    return min.toString();
}

function setRangeSlider(index: number, value: string, slider: noUiSlider.target) {
    const array = [];
    array[index] = value;

    slider.noUiSlider?.set(array);
}

function getMaxPrice(data: SourceData) {
    let max = -Infinity;

    data.items.forEach((card) => {
        if (+card.price > max) {
            max = +card.price;
        }
    });

    return max.toString();
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
