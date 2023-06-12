import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const linkRef = React.useRef();

    const onClear = () => {
        props.onClose();
        linkRef.current.value = '';

    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: linkRef.current.value,
        });

        linkRef.current.value = '';

    }

    return (
        <PopupWithForm title="Обновить аватар" name="update-avatar" isOpen={props.isOpen} onClose={onClear} onSubmit={handleSubmit} buttonText='Сохранить'>
            <>
                <label className="popup__input-label">
                    <input ref={linkRef} type="url" className="popup__input popup__input_type_place-link" name="avatar"
                        placeholder="Ссылка на картинку" minLength="2" maxLength="200" required id="url-avatar" />
                    <span className="url-avatar-error popup__input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;