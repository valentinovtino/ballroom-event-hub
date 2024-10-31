import React, {useEffect, useState} from 'react';
import './App.css';
import EventRadar from './componets/EventRadar';
import FilterPanel from './componets/FilterPanel';

function App() {

  interface Event {
    id: number;
    name: string;
    date: string;
    location: {
      city: string;
      region: string;
      coast: string;
    };
    categories: string[];
    oty_approved: boolean;
    winners?: Array<{
      name: string;
      category: string;
      prize: string;
      points: number;
    }>;
    ticket_link: string;
    details: {
      hosts: string[];
      prizes: string[];
    };
  }
  
  interface EventsData {
    balls: {
      scene: {
        kiki: Event[];
        mainstream: Event[];
      };
    };
  }
  
  interface FilterOptions {
    eventType: string;
    startDate: string;
    endDate: string;
  }
  
  // Update state initialization
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  
  const [events, setEvents] = useState<EventsData | null>(null);



  useEffect(() => {
    fetch('/mockEvents.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: EventsData) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const handleFilterChange = ({ eventType, startDate, endDate }: FilterOptions) => {
    if (!events) return;

    let filteredEventsArray: Event[] = [];

if (eventType && eventType !== "All") {
  // Use type assertion to access the specific scene array
  filteredEventsArray = events.balls.scene[eventType.toLowerCase() as keyof typeof events.balls.scene] || [];
} else {
  // Concatenate both arrays if no specific type is selected
  filteredEventsArray = [...events.balls.scene.kiki, ...events.balls.scene.mainstream];
}
    // Filter by date range if start and end dates are provided
    filteredEventsArray = filteredEventsArray.filter((event: Event) => {
      const eventDate = new Date(event.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      if (start && eventDate < start) return false;
      if (end && eventDate > end) return false;
    
      return true;
    });

    setFilteredEvents(filteredEventsArray);
  };

  return (
    <div className="App">
      <FilterPanel onFilterChange={handleFilterChange} />
      <EventRadar />
      <div>
        {filteredEvents.length ? (
          <pre>{JSON.stringify(filteredEvents, null, 2)}</pre>
        ) : (
          <p>Loading events or no events match the filters...</p>
        )}
      </div>
    </div>
  );
}

export default App;