import React, { useEffect, useState } from "react";
import '../index.css';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from "./ImagePopup";
import Main from './Main.js';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo()
      , api.getInitialCards()
    ])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  const handleCardDelete = (card) => {
    api.deleteCard(card.id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.id));
      })
      .catch(() => console.log('Произошла ошибка'))
  }

  const handleCardLike = (card) => {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
      })
      .catch(() => console.log('Произошла ошибка'))
  }

  const handleAddPlaceSubmit = (card) => {

    api.createCard(card)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch(() => console.log('Произошла ошибка'))

  }

  const handleUpdateUser = (currentUser) => {
    api.updateUserInfo(currentUser)
      .then((userData) => {
        closeAllPopups();
        setCurrentUser(userData);

      })
      .catch(() => console.log('Произошла ошибка'))
  }

  const handleUpdateAvatar = (currentUser) => {
    console.log(currentUser)
    api.updateUserAvatar(currentUser.avatar)
      .then((userData) => {
        closeAllPopups();
        setCurrentUser(userData);

      })
      .catch(() => console.log('Произошла ошибка'))
  }


  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          card={selectedCard}

        ></Main>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <PopupWithForm title="Вы уверены?" name="confirm" onClose={closeAllPopups} buttonText='Да'></PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}>
        </EditAvatarPopup>
      </>

    </CurrentUserContext.Provider>

  );
}

export default App;

