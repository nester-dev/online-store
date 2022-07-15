import { SourceData, State } from '../types/types';
import { getDataBySortType } from './sort';
import { searchMatches } from './searchForm';

export default function multipleFilter(data: SourceData, currentState: State): SourceData {
    let filteredData = JSON.parse(JSON.stringify(data));

    filteredData = getDataBySortType(currentState.sortOrder, filteredData);
    filteredData = searchMatches(currentState.searchTerm, filteredData);
    return filteredData;
}
