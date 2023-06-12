import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from "react";

function Card(card) {

  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName =
    `photo-grid__like ${isLiked && 'photo-grid__like_active'}`;

  function handleCard() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleCardDelete() {
    card.onCardDelete(card);
  }

  return (
    <div className="photo-grid__item">
      <img className="photo-grid__image" alt={card.name} onClick={handleCard} src={card.link} />
      {isOwn && <button className="photo-grid__trash" type="button" onClick={handleCardDelete}></button>}
      <div className="photo-grid__title-container">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="photo-grid__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;