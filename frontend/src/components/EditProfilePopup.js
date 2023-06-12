import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');

  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);

  }

  function handleDescrChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    }
    );
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText='Сохранить'>
      < >
        <label className="popup__input-label">
          <input type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя" minLength="2"
            maxLength="40" id="person-name" required value={name} onChange={handleNameChange} />
          <span className="person-name-error popup__input-error"></span>
        </label>

        <label className="popup__input-label">
          <input type="text" className="popup__input popup__input_type_professions" name="about" placeholder="О себе"
            minLength="2" maxLength="200" id="person-profession" required value={description} onChange={handleDescrChange} />
          <span className="person-profession-error popup__input-error"></span>
        </label>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;