import React from 'react';
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RouteDetails from '../';

describe('testing route details component', () => {
  beforeEach(() => {
    const close = jest.fn();
    render(
      <RouteDetails
        onClose={close}
        details={{ distance: 1000, duration: 3600 }}
      />
    );
  });

  it('should format input data about route', () => {
    expect(screen.getByText(/60хв/i)).toBeInTheDocument();
    expect(screen.getByText(/\(1\.00км\)/i)).toBeInTheDocument();
  });

  it('should check the presence of a button', () => {
    const button = screen.getByRole('button', {
      name: /cкасувати маршрут/i,
    });
    expect(button).toBeInTheDocument();
  });
});