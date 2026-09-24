import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AdaptiveInterview from '../feat-pages/AdaptiveInterview';

// Mock Auth Context
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { _id: '123', name: 'Test User' }
  })
}));

describe('AdaptiveInterview Component', () => {
  it('renders the initial setup form', () => {
    render(
      <BrowserRouter>
        <AdaptiveInterview />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Adaptive AI Interview')).toBeDefined();
    expect(screen.getByLabelText('Target Role')).toBeDefined();
    expect(screen.getByLabelText('Experience Level')).toBeDefined();
    expect(screen.getByLabelText('Topics (comma separated)')).toBeDefined();
    expect(screen.getByText('Start Interview')).toBeDefined();
  });
});
