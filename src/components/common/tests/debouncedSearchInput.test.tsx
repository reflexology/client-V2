import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Dictionary from 'dictionary/dictionary';
import DebouncedSearchInput from '../debouncedSearchInput';

afterEach(cleanup);

it('matches snapshot', () => {
  const { asFragment } = render(<DebouncedSearchInput delay={300} onDebounced={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

it('has search placeholder', () => {
  render(<DebouncedSearchInput delay={300} onDebounced={() => {}} />);
  expect(screen.getByTestId('search')).toHaveAttribute('placeholder', Dictionary.search);
});

it('handle on change', () => {
  render(<DebouncedSearchInput delay={300} onDebounced={() => {}} />);
  const input = screen.getByTestId('search');

  fireEvent.change(input, { target: { value: 'abc' } });
  expect((input as any).value).toBe('abc');
});
