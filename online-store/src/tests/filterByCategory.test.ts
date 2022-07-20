import { filterByCategory } from '../components/filters';
import { DATA } from '../constants/constants';
import { currentState } from '../components/currentState';
import { CardInfo, State } from '../types/types';

const state: State = currentState;
state.type.push('pizza');

const output = DATA;
output.items = output.items.filter((card: CardInfo) => state.type.includes(card.type));

describe('filterByCategory', () => {
    test('Correct value', () => {
        expect(filterByCategory(DATA, currentState)).toBe(output);
    });
});
