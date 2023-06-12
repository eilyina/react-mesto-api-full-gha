import '../blocks/header/__link/header__link.css'
import '../blocks/header/__link/_type/header__link_type_exit.css'
import '../blocks/header/__email/header__email.css'
import '../blocks/header/__email-container/header__email-container.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link" >Войти</Link>} />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link>} />
        <Route path="/" element={<><div className="header__email-container">
          <p className="header__link_type_exit">{props.userData.email}</p><Link to="/sign-in" className="header__link" onClick={signOut}>Выйти</Link>
        </div></>} />
      </Routes>
    </header>
  );
}

export default Header;
