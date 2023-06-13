
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from "./ImagePopup";
import Main from './Main.js';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api, apiAuth } from '../utils/Api.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from "./Login.js";
import ProtectedRouteElement from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [registrationOk, setRegistrationOk] = useState(false);

  const handleLogin = ({ email, password }) => {

    apiAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true)
          setUserData({ email, password })
          navigate('/')
        }
      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }

  const handleRegister = ({ email, password }) => {
    apiAuth.register(email, password)
      .then(() => {
        setIsInfoTooltipPopupOpen(true)
        setRegistrationOk(true)
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true)
        setRegistrationOk(false)
        console.log('Произошла ошибка')
      })
  }


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return
    }
    apiAuth.checkToken()
      .then(res => {
        if (res) {
          setLoggedIn(true)
          setUserData(res)
          navigate('/')
        }
      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }
  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo()
        , api.getInitialCards()
      ])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData.reverse());
        })
        .catch((err) => console.log(`${err}`))
    }

  }, [loggedIn])

  const handleCardDelete = (card) => {
    api.deleteCard(card.id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.id));
      })
      .catch(() => console.log('Произошла ошибка'))
  }
  const handleCardLike = (card) => {

    const isLiked = card.likes.some(i => i === currentUser._id);

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
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard(null);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <>

        <Header link="Войти" userData={userData} />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            card={selectedCard}
            loggedIn={loggedIn}

          />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} onClose={closeAllPopups} registrationOk={registrationOk} isOpen={isInfoTooltipPopupOpen} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="/" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>

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