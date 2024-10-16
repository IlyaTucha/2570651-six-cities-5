import PlaceCard from '@components/place-card/place-card';
import { Helmet } from 'react-helmet-async';
import Logo from '@components/logo/logo';

type MainScreenProps = {
    placesCount: number;
}

export default function MainScreen({placesCount}: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
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
                    <span className="header__favorite-count">3</span>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                        Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlaceCard
                  isPremium
                  imagePath="img/apartment-01.jpg"
                  priceValue={120}
                  isActive={false}
                  cardName="Beautiful &amp; luxurious apartment at great location"
                  starsCount={4}
                  cardType="Apartment"
                />

                <PlaceCard
                  isPremium={false}
                  imagePath="img/room.jpg"
                  priceValue={80}
                  isActive
                  cardName="Wood and stone place"
                  starsCount={4}
                  cardType="Room"
                />

                <PlaceCard
                  isPremium={false}
                  imagePath="img/apartment-02.jpg"
                  priceValue={132}
                  isActive={false}
                  starsCount={4}
                  cardName='Canal View Prinsengracht'
                  cardType='Apartment'
                />

                <PlaceCard
                  isPremium
                  imagePath="img/apartment-03.jpg"
                  priceValue={180}
                  isActive={false}
                  starsCount={5}
                  cardName='Nice, cozy, warm big bed apartment'
                  cardType='Apartment'
                />

                <PlaceCard
                  isPremium={false}
                  imagePath="img/room.jpg"
                  priceValue={80}
                  isActive
                  starsCount={4}
                  cardName='Wood and stone place'
                  cardType='Room'
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
