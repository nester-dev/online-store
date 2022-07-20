import { getDataBySortType } from '../components/sort';
import { CardInfo, SortOrder } from '../types/types';
const data = require('../data/data.json');

const inputAZ = data;
inputAZ.items = inputAZ.items.sort((elem1: CardInfo, elem2: CardInfo) => elem1.name.localeCompare(elem2.name));

const inputZA = data;
inputZA.items = inputZA.items.sort((elem1: CardInfo, elem2: CardInfo) => elem2.name.localeCompare(elem1.name));

describe('getDataBySortType', () => {
    test('Correct value', () => {
        expect(getDataBySortType(SortOrder.nameAZ, data)).toBe(inputAZ);
    });
    test('Correct value', () => {
        expect(getDataBySortType(SortOrder.nameZA, data)).toBe(inputZA);
    });
});
