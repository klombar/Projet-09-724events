import { useState } from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EventCard from "./index";
import ModalEvent from "../../containers/ModalEvent";

const mockEvent = {
  title: 'Event Title',
  imageAlt: 'Event Alt',
  description: 'Event Description',
  date: new Date('2023-01-01'),
  cover: 'cover.jpg',
  prestations: ['Prestation 1', 'Prestation 2'],
  periode: 'periode',
  label: 'Event Label'
};

const TestComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState(null);

  const handleCardClick = (event) => {
    setEventData(event);
    setIsModalOpen(true);
  };

  return (
    <>
      <EventCard 
        imageSrc={mockEvent.cover} 
        imageAlt={mockEvent.imageAlt} 
        date={mockEvent.date} 
        title={mockEvent.title} 
        label={mockEvent.label} 
        onClick={() => handleCardClick(mockEvent)} 
        data-testid="event-card"
      />
      {isModalOpen && <ModalEvent event={eventData} />}
    </>
  );
};

describe("When an event card is clicked", () => {
  it("ModalEvent is open and displays the event data", () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByTestId('event-card'));
    
    const eventTitles = screen.getAllByText('Event Title');
    expect(eventTitles[1]).toBeInTheDocument(); // test du event title de la modale
    expect(screen.getByText('Event Description')).toBeInTheDocument();
    expect(screen.getByText('periode')).toBeInTheDocument();
    expect(screen.getByAltText('Event Alt')).toHaveAttribute('src', 'cover.jpg');
    expect(screen.getByText('Prestation 1')).toBeInTheDocument();
    expect(screen.getByText('Prestation 2')).toBeInTheDocument();
  });
});