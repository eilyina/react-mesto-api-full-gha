
import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const name = React.useRef();
    const link = React.useRef();

    const onClear = () => {
        props.onClose();
        name.current.value = '';
        link.current.value = '';

    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name.current.value,
            link: link.current.value,
        });
        name.current.value = '';
        link.current.value = '';
    }

    return (
        <PopupWithForm title="Новое место" name="create" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={onClear} buttonText='Создать'>
            <>
                <label className="popup__input-label">
                    <input ref={name} type="text" className="popup__input popup__input_type_place-name" name="name" placeholder="Название"
                        minLength="2" maxLength="30" required id="title-mesto" />
                    <span className="title-mesto-error popup__input-error"></span>
                </label>
                <label className="popup__input-label">
                    <input ref={link} type="url" className="popup__input popup__input_type_place-link" name="link"
                        placeholder="Ссылка на картинку" minLength="2" maxLength="200" required id="url-mesto" />
                    <span className="url-mesto-error popup__input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;