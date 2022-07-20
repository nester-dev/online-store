import * as noUiSlider from 'nouislider';
import { CardInfo, SliderType, SourceData, State } from '../types/types';
import multipleFilter from './multipleFilter';
import render from './render';

export function initSlider(
    data: SourceData,
    currentState: State,
    id: string,
    sliderType: string,
    inputs: Array<HTMLInputElement>
) {
    const slider = document.getElementById(id) as noUiSlider.target;

    const minStartValue = getMin(data, sliderType);
    const maxStartValue = getMax(data, sliderType);
    let minValue;
    let maxValue;

    let minStateValue;
    let maxStateValue;

    switch (sliderType) {
        case 'price':
            minStateValue = currentState.minPrice;
            maxStateValue = currentState.maxPrice;
            break;

        case 'weight':
            minStateValue = currentState.minWeight;
            maxStateValue = currentState.maxWeight;
            break;
    }

    if (minStateValue && maxStateValue) {
        minValue = minStateValue;
        maxValue = maxStateValue;
    } else {
        minValue = minStartValue;
        maxValue = maxStartValue;
    }

    inputs[0].setAttribute('min', minStartValue);
    inputs[0].setAttribute('placeholder', minValue);
    inputs[1].setAttribute('min', minStartValue);

    inputs[0].setAttribute('max', maxStartValue);
    inputs[1].setAttribute('placeholder', maxValue);
    inputs[1].setAttribute('max', maxStartValue);

    noUiSlider.create(slider, {
        start: [minValue, maxValue],
        connect: true,
        step: 1,
        range: {
            min: [+minStartValue],
            max: [+maxStartValue],
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

    slider.noUiSlider?.on('update', function (values: (number | string)[], handle: number) {
        inputs[handle].value = values[handle] as string;
        if (sliderType === 'price') {
            currentState.minPrice = inputs[0].value;
            currentState.maxPrice = inputs[1].value;
        }
        if (sliderType === 'weight') {
            currentState.minWeight = inputs[0].value;
            currentState.maxWeight = inputs[1].value;
        }
        localStorage.setItem('state', JSON.stringify(currentState));

        const filteredData = multipleFilter(data, currentState);
        render(filteredData, currentState);
    });

    inputs.forEach((input: HTMLInputElement, index: number) => {
        input.addEventListener('change', (event: Event) => {
            setRangeSlider(index, (event.currentTarget as HTMLInputElement).value, slider);
        });
    });
}

export function getMin(data: SourceData, attr: string) {
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

export function getMax(data: SourceData, attr: string): string {
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

export function sliderFilter(data: SourceData, currentState: State, sliderType: SliderType): SourceData {
    const filteredData = data;

    let minStateValue = '';
    let maxStateValue = '';

    switch (sliderType) {
        case 'price':
            minStateValue = currentState.minPrice;
            maxStateValue = currentState.maxPrice;
            break;

        case 'weight':
            minStateValue = currentState.minWeight;
            maxStateValue = currentState.maxWeight;
            break;
    }

    if (minStateValue.length && maxStateValue.length) {
        filteredData.items = filteredData.items.filter(
            (card: CardInfo) => +card[sliderType] >= +minStateValue && +card[sliderType] <= +maxStateValue
        );
    }

    return filteredData;
}
