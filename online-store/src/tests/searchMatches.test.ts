import { DATA } from '../constants/constants';
import { CardInfo } from '../types/types';
import { searchMatches } from '../components/searchForm';

const output = DATA;
output.items = output.items.filter((card: CardInfo) => card.name.toLowerCase().includes('барбекю'));

describe('filterByCategory', () => {
    test('Correct value', () => {
        expect(searchMatches('барбекю', output)).toBe(output);
    });
});
