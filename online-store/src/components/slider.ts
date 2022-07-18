import * as noUiSlider from 'nouislider';
import { CardInfo, SliderType, SourceData, State } from '../types/types';
import { INPUT1, INPUT2, INPUT3, INPUT4, INPUTS_PRICE, INPUTS_WEIGHT } from '../constants/constants';
import multipleFilter from './multipleFilter';
import render from './render';

export function priceSlider(data: SourceData, currentState: State): void {
    const priceSlider = document.getElementById('filter-price') as noUiSlider.target;

    const minStartPrice = getMin(data, SliderType.price);
    const maxStartPrice = getMax(data, SliderType.price);
    let minPrice;
    let maxPrice;

    if (currentState.minPrice && currentState.maxPrice) {
        minPrice = currentState.minPrice;
        maxPrice = currentState.maxPrice;
    } else {
        minPrice = minStartPrice;
        maxPrice = maxStartPrice;
    }

    INPUT1.setAttribute('min', minStartPrice);
    INPUT1.setAttribute('placeholder', minPrice);
    INPUT2.setAttribute('min', minStartPrice);

    INPUT1.setAttribute('max', maxStartPrice);
    INPUT2.setAttribute('placeholder', maxPrice);
    INPUT2.setAttribute('max', maxStartPrice);

    noUiSlider.create(priceSlider, {
        start: [minPrice, maxPrice],
        connect: true,
        step: 1,
        range: {
            min: [+minStartPrice],
            max: [+maxStartPrice],
        },

        format: {
            to: function (value: number) {
                return Math.floor(value);
            },
            from: function (value: string) {
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

    INPUTS_PRICE.forEach((input: HTMLInputElement, index: number) => {
        input.addEventListener('change', (event: Event) => {
            setRangeSlider(index, (event.currentTarget as HTMLInputElement).value, priceSlider);
        });
    });
}

export function weightSlider(data: SourceData, currentState: State) {
    const weightSlider = document.getElementById('filter-weight') as noUiSlider.target;

    const minStartWeight = getMin(data, SliderType.weight);
    const maxStartWeight = getMax(data, SliderType.weight);
    let minWeight;
    let maxWeight;

    if (currentState.minWeight && currentState.maxWeight) {
        minWeight = currentState.minWeight;
        maxWeight = currentState.maxWeight;
    } else {
        minWeight = minStartWeight;
        maxWeight = maxStartWeight;
    }

    INPUT3.setAttribute('min', minStartWeight);
    INPUT3.setAttribute('placeholder', minWeight);
    INPUT4.setAttribute('min', minStartWeight);

    INPUT3.setAttribute('max', maxStartWeight);
    INPUT4.setAttribute('placeholder', maxWeight);
    INPUT4.setAttribute('max', maxStartWeight);

    noUiSlider.create(weightSlider, {
        start: [minWeight, maxWeight],
        connect: true,
        step: 10,
        range: {
            min: [+minStartWeight],
            max: [+maxStartWeight],
        },

        format: {
            to: function (value: number) {
                return Math.floor(value);
            },
            from: function (value: string) {
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

    INPUTS_WEIGHT.forEach((input: HTMLInputElement, index: number) => {
        input.addEventListener('change', (event: Event) => {
            setRangeSlider(index, (event.currentTarget as HTMLInputElement).value, weightSlider);
        });
    });
}

function getMin(data: SourceData, attr: string) {
    let min = Infinity;

    data.items.forEach((card: CardInfo) => {
        switch (attr) {
            case SliderType.price:
                if (+card[SliderType.price] < min) {
                    min = +card.price;
                }
                break;

            case SliderType.weight:
                if (+card[SliderType.weight] < min) {
                    min = +card.weight;
                }
                break;
        }
    });

    return min.toString();
}

function getMax(data: SourceData, attr: string): string {
    let max = -Infinity;

    data.items.forEach((card) => {
        switch (attr) {
            case SliderType.price:
                if (+card.price > max) {
                    max = +card.price;
                }
                break;

            case SliderType.weight:
                if (+card.weight > max) {
                    max = +card.weight;
                }
                break;
        }
    });

    return max.toString();
}

function setRangeSlider(index: number, value: string, slider: noUiSlider.target): void {
    const array = [];
    array[index] = value;

    slider.noUiSlider?.set(array);
}

export function priceSliderFilter(data: SourceData, currentState: State): SourceData {
    const filteredData = data;

    if (currentState.minPrice.length && currentState.maxPrice.length) {
        filteredData.items = filteredData.items.filter(
            (card: CardInfo) => +card.price >= +currentState.minPrice && +card.price <= +currentState.maxPrice
        );
    }

    return filteredData;
}

export function weightSliderFilter(data: SourceData, currentState: State): SourceData {
    const filteredData = data;

    if (currentState.minWeight.length && currentState.maxWeight.length) {
        filteredData.items = filteredData.items.filter(
            (card: CardInfo) => +card.weight >= +currentState.minWeight && +card.weight <= +currentState.maxWeight
        );
    }

    return filteredData;
}
