import React from 'react';
import {screen} from '@testing-library/dom';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../../../../../rootReducer';
import MyTimeField from '../../../../../shared/Fields/timeField';

const mockInitialState = {
  initialState: {
    setFullTime: {
      fullTime: false,
      timeFrom: 8,
      timeUntil: 14,
    },
  },
};

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};


describe('testing settings of checkbox and time fields with initial values', () => {
  let selectFrom;
  let selectUntil;

  beforeEach(() => {
    renderWithRedux(<MyTimeField />);
    [selectFrom, selectUntil] = screen.getAllByRole('button', {
      name: '00:00',
    });
  })

  it('should check checkbox work', () => {
    const checkbox = screen.getByRole('checkbox', { name: 'Цілодобово' });
    expect(checkbox).not.toBeChecked();
    expect(selectFrom).not.toHaveClass('Mui-disabled');
    expect(selectUntil).not.toHaveClass('Mui-disabled');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(selectFrom).toHaveClass('Mui-disabled');
    expect(selectUntil).toHaveClass('Mui-disabled');
  });

  it('should check the box to select off', () => {
    userEvent.click(selectFrom);
    userEvent.selectOptions(screen.getByRole('option', { name: /05:00/i }));
    expect(selectFrom).toHaveTextContent('05:00');
    userEvent.click(selectUntil);
    expect(screen.getByRole('option', { name: /03:00/i })).toHaveClass(
      'Mui-disabled'
    );
    expect(screen.getByRole('option', { name: /06:00/i })).not.toHaveClass(
      'Mui-disabled'
    );
  });
});

describe('testing set time fields with custom values', () => {
  it('should check operation at different times and block unavailable options', () => {
    renderWithRedux(<MyTimeField />, mockInitialState);
    const from = screen.queryByText(/08:00/i);
    const until = screen.queryByText(/14:00/i);
    expect(from).toBeInTheDocument();
    expect(until).toBeInTheDocument();
    userEvent.click(from);
    expect(screen.getByRole('option', { name: /14:00/i })).toHaveClass(
      'Mui-disabled'
    );
    userEvent.click(until);
    expect(screen.getByRole('option', { name: /08:00/i })).toHaveClass(
      'Mui-disabled'
    );
    expect(screen.getByRole('option', { name: /09:00/i })).not.toHaveClass(
      'Mui-disabled'
    );
  });

  it('should check operation at unavailable options with default fullTime true', () => {
    renderWithRedux(<MyTimeField />, {
      ...mockInitialState,
      initialState: {
        setFullTime: {
          fullTime: true,
          timeFrom: 8,
          timeUntil: 14,
        },
      },
    });
    const checkbox = screen.getByRole('checkbox', { name: 'Цілодобово' });
    const from = screen.queryByText(/08:00/i);
    const until = screen.queryByText(/14:00/i);
    expect(checkbox).toBeChecked();
    expect(from).toHaveClass('Mui-disabled');
    expect(until).toHaveClass('Mui-disabled');
  });
});