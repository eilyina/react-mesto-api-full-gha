import React, { useContext } from "react";
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const user = useContext(CurrentUserContext);
  return (

    <main className="content">
      <section className="profile">
        <div className="profile__info-block">
          <div className="profile__image" style={{ backgroundImage: `url(${user.avatar})` }} >
            <button onClick={props.onEditAvatar} className="profile__edit-avatar-button" type="button"></button>
          </div>
          <div className="profile__info">
            <div className="profile__edit-title">
              <h1 className="profile__title">{user.name}</h1>
              <button onClick={props.onEditProfile} className="profile__edit-button" type="button">
              </button>
            </div>
            <p className="profile__subtitle">{user.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button">
        </button>
      </section>
      <section className="photo-grid">
        {props.cards.map((card) =>
        (
          <Card key={card._id}
            id={card._id}
            name={card.name}
            owner={card.owner}
            link={card.link}
            likes={card.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          ></Card>
        ))
        }
      </section>
    </main>
  );
}

export default Main;
