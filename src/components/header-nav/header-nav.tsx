import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Cities } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { logoutAction } from '@store/api-actions';
import { memo, useCallback, useMemo } from 'react';
import { getOffers } from '@store/offers-data/selectors';
import { getAuthorizationStatus, getAvatarUrl, getUserEmail } from '@store/user-process/selectors';
import { changeCity } from '@store/app-data/app-data';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const avatarUrl = useAppSelector(getAvatarUrl);

  const favoritesCount = useMemo(() => offers.filter((offer) => offer.isFavorite).length, [offers]);

  const handleSignOut = useCallback(() => {
    dispatch(logoutAction())
      .then(() => {
        dispatch(changeCity(Cities[0]));
      });
  }, [dispatch]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {avatarUrl && (<img className="user__avatar" src={avatarUrl} alt="avatar"/>)}
                </div>
                <span className="header__user-name user__name">{userEmail}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={AppRoute.Root} onClick={handleSignOut}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>)
          : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}

const MemoizedHeaderNav = memo(HeaderNav);
export default MemoizedHeaderNav;
