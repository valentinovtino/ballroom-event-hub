import React, {useEffect, useState} from 'react';
import './App.css';
import EventRadar from './componets/EventRadar';


function App() {
 const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch('/mockEvents.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.json();
        })
        .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  return (
    <div className="App">
      <EventRadar />
      <div>
        {/* refactor conditional rendering below */}
      {events ? (
          <pre>{JSON.stringify(events, null, 2)}</pre>
        ) : (
          <p>Loading events...</p>
        )}
      </div>
    </div>
  );
}

export default App;
