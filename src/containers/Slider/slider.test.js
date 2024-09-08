import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useData } from '../../contexts/DataContext';
import Slider from './index';

// Mock the useData hook
jest.mock('../../contexts/DataContext', () => ({
  useData: jest.fn(),
}));

const mockData = {
  focus: [
    {
      date: '2023-01-01',
      title: 'Event 1',
      description: 'Description 1',
      cover: 'cover1.jpg',
    },
    {
      date: '2023-02-01',
      title: 'Event 2',
      description: 'Description 2',
      cover: 'cover2.jpg',
    },
  ],
};

describe('Slider Component', () => {
  beforeEach(() => {
    useData.mockReturnValue({ data: mockData });
  });

  test('renders correctly with initial state', () => {
   render(<Slider />);
   expect(screen.getByText('Event 1')).toBeInTheDocument();
   expect(screen.getByText('Description 1')).toBeInTheDocument();
   const images = screen.getAllByAltText('forum');
   expect(images[0]).toHaveAttribute('src', 'cover1.jpg');
 });

  test('automatically changes slides', () => {
    jest.useFakeTimers();
    render(<Slider />);

    // Initial state
    expect(screen.getByText('Event 1')).toBeInTheDocument();

    // Fast-forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // After 5 seconds, it should show the next event
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  test('changes slides on radio button click', () => {
    render(<Slider />);

    // Initial state
    expect(screen.getByText('Event 1')).toBeInTheDocument();

    // Click on the second radio button
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]);

    // It should show the second event
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });
});