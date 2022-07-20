import { getMax } from '../components/slider';

const data = require('../data/data.json');

describe('getMax', () => {
    test('Correct value', () => {
        expect(getMax(data, 'price')).toBe('525');
    });
    test('Correct value', () => {
        expect(getMax(data, 'weight')).toBe('630');
    });
});
