import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AdaptiveInterview from '../feat-pages/AdaptiveInterview';
import { UserContext } from '../context/userContext';

describe('AdaptiveInterview Component', () => {
  it('renders the initial setup form', () => {
    render(
      <UserContext.Provider
        value={{
          user: { _id: '123', name: 'Test User' },
        }}
      >
        <BrowserRouter>
          <AdaptiveInterview />
        </BrowserRouter>
      </UserContext.Provider>
    );

    expect(screen.getByText('Adaptive AI Interview')).toBeDefined();
    expect(screen.getByLabelText('Target Role')).toBeDefined();
    expect(screen.getByLabelText('Experience Level')).toBeDefined();
    expect(screen.getByLabelText('Topics (comma separated)')).toBeDefined();
    expect(screen.getByText('Start Interview')).toBeDefined();
  });
});