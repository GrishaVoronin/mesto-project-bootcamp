const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const savePopupButton = popup.querySelector('.popup__button');
const buttonClosePopup = popup.querySelector('.popup__close-icon');
const formPopup = popup.querySelector('.popup__form');
const nameInput = formPopup.querySelector('.popup__input_type_name');
const jobInput = formPopup.querySelector('.popup__input_type_job');
const elements = document.querySelector('.elements__element');
const templateCard = document.querySelector('#template-cards').content
const addCardButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_card-add');
const closePopupButton = document.querySelector('.popup_card-close');
const popupForm = document.querySelector('#create__card')   
const nameCardInput = document.querySelector('.name__card-input');
const linkCardInput = document.querySelector('.link__input');
const popupImageZoom = document.querySelector('.popup_image-zoom')
const closePopupImage = document.querySelector('.popup__close_zoom_image');

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', function() {
  openPopup(popup);
});

buttonClosePopup.addEventListener('click', function() {
  closePopup(popup)
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileText.textContent = jobValue;
  closePopup(popup);
}

formPopup.addEventListener('submit', handleFormSubmit)

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  }
];

function createCard(name, link) {
  const cardElement = templateCard.querySelector('.element').cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector('.element__image').alt = name
  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard)
  cardElement.querySelector('.element__button-bucket').addEventListener('click', deleteCard)
  cardElement.querySelector('.element__image').addEventListener('click', openPopupCard)
  elements.prepend(cardElement);
}

function renderCard() {
  initialCards.forEach(item => createCard(item.name, item.link))
}

renderCard();

addCardButton.addEventListener('click', function() {
  openPopup(popupCards);
});

closePopupButton.addEventListener('click', function() {
  closePopup(popupCards);
});

function addCard() {
  popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault()
    createCard(nameCardInput.value, linkCardInput.value);
    closePopup(popupCards)
  })
}

addCard();

function likeCard(evt) {
  evt.target.classList.toggle('element__button-like-active')
}

function deleteCard(evt) {
  evt.currentTarget.closest('.element').remove();
}

function openPopupCard(evt) {
  document.querySelector('.popup__image').src = evt.currentTarget.closest('.element__image').src;
  document.querySelector('.popup__caption').textContent = evt.currentTarget.closest('.element__image').alt
  openPopup(popupImageZoom)
}

closePopupImage.addEventListener('click', function() {
  closePopup(popupImageZoom);
});