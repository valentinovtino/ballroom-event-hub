import React from 'react';
import '../App.css';

const EventRadar = () => {

    const events = [
        { id: 1, x: 20, y: 30 },
        { id: 2, x: 60, y: 50 },
        { id: 3, x: 80, y: 80 },
      ];

    return (
        <div className="radar-container">
           {events.map(event => (
      <div
        key={event.id}
        className="event-dot"
        style={{
          top: `${event.y}%`,
          left: `${event.x}%`
        }}
      ></div>
    ))}
        </div>
    );
};

export default EventRadar;