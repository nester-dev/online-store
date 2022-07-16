import { BODY, LOCKPADDINGVALUE, POPUP, POPUP_CLOSE } from '../constants/constants';

export default function popup() {
    POPUP.classList.add('popup-open');
    bodyLock();

    POPUP.addEventListener('click', popupClose);
}

function bodyLock() {
    BODY.style.paddingRight = LOCKPADDINGVALUE;
    BODY.classList.add('lock');
}

function bodyUnlock() {
    BODY.style.paddingRight = '0px';
    BODY.classList.remove('lock');
}

function popupClose(event: Event) {
    if (event.target == POPUP_CLOSE || !(event.target as HTMLElement).closest('.popup__content')) {
        POPUP.classList.remove('popup-open');
        bodyUnlock();
        event.preventDefault();
    }
    POPUP_CLOSE.removeEventListener('click', popupClose);
}
