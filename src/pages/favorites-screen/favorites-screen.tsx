import { Helmet } from 'react-helmet-async';
import Logo from '@components/logo/logo';
import { Offers } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '@const';

type FavoritesScreenProps = {
  offers: Offers;
};

export default function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favorites = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favorites.length}</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favorites.length > 0 ? (
                favorites.map((favorite) => (
                  <li key={favorite.id} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Root}>
                          <span>{favorite.city.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <article className="favorites__card place-card">
                        {favorite.isPremium ?
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                          :
                          null}
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`${AppRoute.Offer}/${favorite.id}`}>
                            <img className="place-card__image" src={favorite.previewImage} width="150" height="110" alt="Place image" />
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{favorite.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{ width: `${(favorite.rating / 5) * 100}%` }}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <a href="#">{favorite.title}</a>
                          </h2>
                          <p className="place-card__type">{favorite.type}</p>
                        </div>
                      </article>
                    </div>
                  </li>
                ))
              ) : (
                <li style={{textAlign: 'center', marginTop: '15%', fontSize: '32px'}}>Nothing yet saved</li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
