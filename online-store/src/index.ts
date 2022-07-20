import './scss/style.scss';
import { DATA } from './constants/constants';
import init from './components/init';
import { currentState } from './components/currentState';

init(DATA, currentState);
