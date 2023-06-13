export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка ${res.status}`))

  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      // .then(data => {return data})
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }

  getInitialCards() {

    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  updateUserInfo(userData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  createCard(cardData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  deleteCard(idCard) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  updateUserAvatar(userAvatar) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  changeLikeCardStatus(idCard, isLike) {
    // console.log(isLike8)
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/${idCard}/likes`, {
      method: isLike ? 'DELETE' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }

  register(email, password) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        // headers: this.headers,
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  };

  authorize(email, password) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  };

  checkToken = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {

      headers: {
        authorization : `Bearer ${token}`
      }
    })
      // .then(data => {return data})
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }
}

export const api = new Api(
  {
    // baseUrl: 'http://localhost:3000'
    baseUrl: 'https://eilyina.nomoredomains.rocks'
    // ,
    // headers: {
    //   // authorization: 'e09a1222-df71-4836-98f4-17c2724f4e45',
    //   'Content-Type': 'application/json'
    // }
  });

export const apiAuth = new Api(
  {
    // baseUrl: 'http://localhost:3000'
    baseUrl: 'https://api.eilyina.nomoredomains.rocks'
    // ,
    // headers: {
    //   "Content-Type": "application/json"
    // }
  });