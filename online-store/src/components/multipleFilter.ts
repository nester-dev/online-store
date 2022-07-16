import { SourceData, State } from '../types/types';
import { getDataBySortType } from './sort';
import { searchMatches } from './searchForm';
import { filterByCategory } from './filters';

export default function multipleFilter(data: SourceData, currentState: State): SourceData {
    let filteredData = JSON.parse(JSON.stringify(data));

    filteredData = filterByCategory(filteredData, currentState);
    filteredData = getDataBySortType(currentState.sortOrder, filteredData);
    filteredData = searchMatches(currentState.searchTerm, filteredData);
    return filteredData;
}
