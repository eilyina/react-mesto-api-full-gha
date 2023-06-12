import React, { useState } from "react";

function Login(props) {
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
    props.handleLogin({ email, password })
  }

  return (

    <main className="content">
      <div className="register">
        <h3 className="register__title">Вход</h3>
        <form className={`popup__form`} method="post" onSubmit={handleSubmit}>
          <label className="popup__input-label">
            <input type="email" className="register__input" name="email" placeholder="Email" onChange={handleChange} required />
            <span className="person-name-error popup__input-error"></span>
          </label>

          <label className="popup__input-label">
            <input type="password" className="register__input" name="password" placeholder="Пароль" onChange={handleChange}
              required />
            <span className="person-profession-error popup__input-error"></span>
          </label>
          <button type="submit" className="register__submit">Войти</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
