import { getMin } from '../components/slider';

const data = require('../data/data.json');

describe('getMin', () => {
    test('Correct value', () => {
        expect(getMin(data, 'price')).toBe('149');
    });
    test('Correct value', () => {
        expect(getMin(data, 'weight')).toBe('200');
    });
});
