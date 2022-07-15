import { SourceData, State } from '../types/types';
import { getDataBySortType } from './sort';

export default function multipleFilter(data: SourceData, currentState: State): SourceData {
    let filteredData = data;

    filteredData = getDataBySortType(currentState.sortOrder, filteredData);
    return filteredData;
}
