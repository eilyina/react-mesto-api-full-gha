import successLogo from '../images/success.png'
import failLogo from '../images/fail.png'
import '../blocks/info-tooltip/__image/info-tooltip__image.css'
import '../blocks/info-tooltip/__text/info-tooltip__text.css'

function InfoTooltip({ isSuccess, text, isOpen, onClose }) {

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="info-tooltip__image" style={{ backgroundImage: `url(${isSuccess ? successLogo : failLogo})` }} ></div>
                <h3 className="info-tooltip__text">{`${text}`}</h3>
                <button className="popup__cross popup__cross_type_edit" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;