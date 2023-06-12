import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../blocks/register/register.css'
import '../blocks/register/__title/register__title.css'
import '../blocks/register/__input/register__input.css'
import '../blocks/register/__submit/register__submit.css'
import '../blocks/register/__link/register__link.css'
import InfoTooltip from './InfoTooltip';

function Register(props) {

    const [formValue, setFormValue] = useState({ 'email': '', 'password': '' })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue(
            {
                ...formValue,
                [name]: value
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        props.handleRegister({ email, password });

    }

    return (

        <><main className="content">
            <div className="register">
                <h3 className="register__title">Регистрация</h3>
                <form className={`popup__form`} method="post" onSubmit={handleSubmit}>
                    <label className="popup__input-label">
                        <input type="email" className="register__input" name="email" value={formValue.email} placeholder="Email" onChange={handleChange} required />
                        <span className="person-name-error popup__input-error"></span>
                    </label>

                    <label className="popup__input-label">
                        <input type="password" className="register__input" name="password" placeholder="Пароль" value={formValue.password} onChange={handleChange}
                            required />
                        <span className="person-profession-error popup__input-error"></span>
                    </label>
                    <button type="submit" className="register__submit">Зарегистрироваться</button>
                    <div className="register__link">
                        <p>Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
            <InfoTooltip isSuccess={props.registrationOk} text={props.registrationOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                isOpen={props.isOpen} onClose={props.onClose}></InfoTooltip></>
    );
}

export default Register;
