import { SliderType, SourceData, State } from '../types/types';
import { getDataBySortType } from './sort';
import { searchMatches } from './searchForm';
import { filterByCategory, filterByCheese, filterByPopular, filterBySpicy } from './filters';
import { sliderFilter } from './slider';

export default function multipleFilter(data: SourceData, currentState: State): SourceData {
    let filteredData = JSON.parse(JSON.stringify(data));

    filteredData = filterByCategory(filteredData, currentState);
    filteredData = filterByCheese(filteredData, currentState);
    filteredData = filterBySpicy(filteredData, currentState);
    filteredData = sliderFilter(filteredData, currentState, SliderType.price);
    filteredData = sliderFilter(filteredData, currentState, SliderType.weight);
    filteredData = filterByPopular(filteredData, currentState);
    filteredData = getDataBySortType(currentState.sortOrder, filteredData);
    filteredData = searchMatches(currentState.searchTerm, filteredData);
    return filteredData;
}
