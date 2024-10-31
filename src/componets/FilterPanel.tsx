import React, { useState, useEffect } from 'react';

interface FilterOptions {
  eventType: string;
  startDate: string;
  endDate: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [eventType, setEventType] = useState<string>(''); // For event type (Kiki or Mainstream)
  const [startDate, setStartDate] = useState<string>(''); // For start date
  const [endDate, setEndDate] = useState<string>('');     // For end date

  useEffect(() => {
    onFilterChange({ eventType, startDate, endDate });
  }, [eventType, startDate, endDate]);

  return (
    <div>
      <h3>Filter Events</h3>
      <label>
        Event Type:
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="">All</option>
          <option value="Kiki">Kiki</option>
          <option value="Mainstream">Mainstream</option>
        </select>
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
    </div>
  );
}

export default FilterPanel;
