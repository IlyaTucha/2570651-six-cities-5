import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus } from '@const';
import { makeFakeState } from '@utils/mocks';
import { createMemoryHistory } from 'history';

describe('Component: PrivateRoute', () => {
  it('renders content when user is authorized', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
          <span>Protected Content</span>
        </PrivateRoute>
      ),
      makeFakeState()
    );

    render(withStoreComponent);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when user is not authorized', () => {
    const history = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
          <span>Protected Content</span>
        </PrivateRoute>,
        history
      ),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null,
        }
      })
    );

    render(withStoreComponent);
    expect(history.location.pathname).toBe(AppRoute.Login);
  });
});