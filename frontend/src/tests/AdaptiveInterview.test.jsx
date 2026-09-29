import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AdaptiveInterview from '../feat-pages/AdaptiveInterview';
import { UserContext } from '../context/userContext';

// Mock User Context
vi.mock('../context/userContext', () => ({
  UserContext: {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({ user: { _id: '123', name: 'Test User' } })
  }
}));

describe('AdaptiveInterview Component', () => {
  it('renders the initial setup form', () => {
    const mockUserContext = { user: { _id: '123', name: 'Test User' } };

    render(
      <BrowserRouter>
        <UserContext.Provider value={mockUserContext}>
          <AdaptiveInterview />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Adaptive AI Interview')).toBeDefined();
    expect(screen.getByText('Target Role')).toBeDefined();
    expect(screen.getByText('Experience Level')).toBeDefined();
    expect(screen.getByText('Topics to Cover')).toBeDefined();
    expect(screen.getByText(/Start Adaptive Session/i)).toBeDefined();
  });
});
