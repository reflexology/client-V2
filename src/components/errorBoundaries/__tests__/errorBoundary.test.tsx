import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../errorBoundary';

describe('<ErrorBoundary />', () => {
  it('renders error', () => {
    render(
      <ErrorBoundary>
        <div>
          <h1>I am inside the error boundary</h1>
        </div>
      </ErrorBoundary>
    );
    const linkElement = screen.getByText(/I am inside the error boundary/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders children if no error', () => {
    const tree = (children?: React.ReactNode) =>
      renderer
        .create(
          <MemoryRouter>
            <ErrorBoundary>{children}</ErrorBoundary>
          </MemoryRouter>
        )
        .toJSON();
    expect(
      tree(
        <div>
          <h1>I am inside the error boundary</h1>
        </div>
      )
    ).toMatchSnapshot();
  });
});
