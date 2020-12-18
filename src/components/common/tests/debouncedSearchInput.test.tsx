import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Dictionary from 'dictionary/dictionary';
import DebouncedSearchInput from '../debouncedSearchInput';

afterEach(cleanup);

it('matches snapshot', () => {
  const { asFragment } = render(<DebouncedSearchInput delay={300} onDebounced={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

it('has search placeholder', () => {
  const { getByTestId } = render(<DebouncedSearchInput delay={300} onDebounced={() => {}} />);
  expect(getByTestId('search')).toHaveAttribute('placeholder', Dictionary.search);
});

it('handle on change', () => {
  const { getByTestId } = render(<DebouncedSearchInput delay={300} onDebounced={() => {}} />);
  const input = getByTestId('search');

  fireEvent.change(input, { target: { value: 'abc' } });
  expect((input as any).value).toBe('abc');
});
