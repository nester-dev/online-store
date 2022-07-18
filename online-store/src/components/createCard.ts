import { CardInfo } from '../types/types';
import { buttonText, IMAGE_PATH } from '../constants/constants';

export default function createCard(data: CardInfo): HTMLDivElement {
    const card = document.createElement('div');
    const cardTag = document.createElement('div');
    const cardWrapper = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardDescription = document.createElement('div');
    const cardTitle = document.createElement('h2');
    const cardComposition = document.createElement('p');
    const cardBottom = document.createElement('div');
    const cardButton = document.createElement('div');
    const cardPrice = document.createElement('div');

    card.classList.add('card');
    cardTag.classList.add('card__tag');
    cardWrapper.classList.add('card__wrapper');
    cardImage.classList.add('card__image');
    cardDescription.classList.add('card__description');
    cardTitle.classList.add('card__title');
    cardComposition.classList.add('card__composition');
    cardBottom.classList.add('card__bottom');
    cardButton.classList.add('card__button');
    cardPrice.classList.add('card__price');

    if (data.tag) {
        cardTag.innerText = data.tag;
        card.appendChild(cardTag);
    }

    cardImage.src = `${IMAGE_PATH}${data.imageName}.png`;
    cardTitle.innerText = data.name;
    cardButton.innerText = buttonText;
    cardPrice.innerText = `${data.price} ₽`;

    cardWrapper.appendChild(cardImage);
    cardBottom.append(cardButton, cardPrice);
    cardDescription.append(cardTitle, cardBottom);

    if (data.composition) {
        cardComposition.innerText = data.composition.join(', ');
        cardBottom.before(cardComposition);
    }

    card.append(cardWrapper, cardDescription);

    return card;
}
