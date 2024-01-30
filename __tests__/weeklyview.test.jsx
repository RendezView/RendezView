import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeeklyView from './weeklyview';

// Mock the global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ link: 'test-link' }),
  }),
);

describe('WeeklyView', () => {
  it('renders without crashing', () => {
    render(<WeeklyView />);
    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
  });
});

describe('WeeklyView with Props', () => {
  it('displays the correct user name', () => {
    render(<WeeklyView userName="Test User" />);
    // Assuming the user name is displayed somewhere in your component
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});

describe('WeeklyView Events', () => {
  it('handles submit button click', () => {
    render(<WeeklyView />);
    fireEvent.click(screen.getByText('Submit'));
    // Verify something changes after the click event
  });
});
