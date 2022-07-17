import './scss/style.scss';
import render from './components/render';
import { sort } from './components/sort';
import { searchFormEvent } from './components/searchForm';
import { currentState } from './components/currentState';
import { data } from './constants/constants';
import filtersEvent from './components/filters';
import filterPrice from './components/slider';

render(data, currentState);
sort();
searchFormEvent(data, currentState);
filtersEvent(currentState);
filterPrice(data, currentState);
