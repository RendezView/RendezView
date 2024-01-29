import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import './style/WeeklyView.css';
import AvailabilityDisplay from './AvailabilityDisplay';

const WeeklyView = ({
  startDate,
  endDate,
  userColor,
  userName,
  organizerName,
  meetingName,
  meetingLocation,
  meetingDescription,
  generatedLink,
  setGeneratedLink,
  eventId,
  isOrganizer,
  userAvailabilities
}) => {
  const calendarRef = useRef(null); // Create a ref for the calendar
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [newAvailabilities, setNewAvailabilities] = useState([]); // State for new availabilities
  const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    if (userAvailabilities && userAvailabilities.length > 0) {
      const formattedAvailabilities = userAvailabilities.map(availability => {
        // Convert UTC time to user's local time zone
        const localStartTime = new Date(availability.available_time_start).toLocaleString('en-US', { timeZone: userTimeZone });
        const localEndTime = new Date(availability.available_time_end).toLocaleString('en-US', { timeZone: userTimeZone });
  
        // Parse the local time and format it
        const parsedStartTime = new Date(localStartTime);
        const parsedEndTime = new Date(localEndTime);

        // formatting time to be like this "yyyy-MM-ddTHH:mm:ss" for dayPilot
        const formattedStart = `${parsedStartTime.getFullYear()}-${String(parsedStartTime.getMonth() + 1).padStart(2, '0')}-${String(parsedStartTime.getDate()).padStart(2, '0')}T${String(parsedStartTime.getHours()).padStart(2, '0')}:${String(parsedStartTime.getMinutes()).padStart(2, '0')}:${String(parsedStartTime.getSeconds()).padStart(2, '0')}`;
        const formattedEnd = `${parsedEndTime.getFullYear()}-${String(parsedEndTime.getMonth() + 1).padStart(2, '0')}-${String(parsedEndTime.getDate()).padStart(2, '0')}T${String(parsedEndTime.getHours()).padStart(2, '0')}:${String(parsedEndTime.getMinutes()).padStart(2, '0')}:${String(parsedEndTime.getSeconds()).padStart(2, '0')}`;
  
        return {
          start: formattedStart,
          end: formattedEnd,
          text: availability.text,
          backColor: availability.back_color,
          userName: availability.user_name,
        };
      });
      setSelectedRanges(formattedAvailabilities);
    }
  }, [userAvailabilities, userTimeZone]);

  useEffect(() => {
    console.log("selected ranges: ", selectedRanges);
  }, [selectedRanges])

  const config = useMemo(() => {
    const localStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : null;
    const localEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : null;
    const days = localStartDate && localEndDate ? Math.ceil((new Date(localEndDate) - new Date(localStartDate)) / (1000 * 60 * 60 * 24)) + 1 : 7;

    return {
      viewType: 'Days',
      days: days,
      startDate: new DayPilot.Date(localStartDate).toString(),
      onTimeRangeSelected: (args) => {
        const rangeWithUser = {
          start: new DayPilot.Date(args.start.value, true).toString(),
          end: new DayPilot.Date(args.end.value, true).toString(),
          id: DayPilot.guid(),
          text: 'Selected',
          backColor: userColor,
          userName: userName,
        };
        setNewAvailabilities(prev => [...prev, rangeWithUser]);
        setSelectedRanges(prevRanges => [...prevRanges, rangeWithUser]);
      },
    };
  }, [startDate, endDate, userColor, userName]);

  useEffect(() => {
    const events = selectedRanges.map((range) => ({
      start: range.start,
      end: range.end,
      id: range.id,
      text: range.userName || 'Anonymous',
      backColor: range.backColor || '#F8F9FA',
    }));
    if (calendarRef.current && calendarRef.current.control) {
      calendarRef.current.control.events.list = events;
      calendarRef.current.control.update();
    }
  }, [selectedRanges]);

  const handleClick = async () => {
    const postData = isOrganizer
      ? {
          organizer_name: organizerName,
          meeting_name: meetingName,
          meeting_description: meetingDescription,
          location: meetingLocation,
          // date_start: startDate ? new DayPilot.Date(startDate).toString(): null,
          // date_end: endDate ? new DayPilot.Date(endDate).toString() : null,
          date_start: startDate['$d'].toJSON().split('T')[0], // "2023-12-20"
          date_end: endDate['$d'].toJSON().split('T')[0],
          time_start: '00:00:00',
          time_end: '23:59:59',
          userAvailabilities: selectedRanges,
        }
      : {
          event_id: eventId,
          userAvailabilities: newAvailabilities,
        };

    try {
      const response = await fetch(isOrganizer ? '/api/newEvent' : '/api/availability/:link', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const result = await response.json();
        if (isOrganizer) {
          const formattedLink = `http://localhost:5001/availability/${result.link}`;
          setGeneratedLink(formattedLink);
        }
        console.log('Success: Request Complete', result);
      } else {
        console.log('Error: Request Failed');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div>
      <div className='weekly-view-container'>
        <h2 className='weekly-view-heading'>Weekly Schedule</h2>
        <div className='weekly-view-calendar'>
          <DayPilotCalendar {...config} ref={calendarRef} />
        </div>
        <button onClick={handleClick} className='submitBtn'>
          Submit
        </button>
      </div>
      <AvailabilityDisplay selectedRanges={selectedRanges} />
    </div>
  );
};

export default WeeklyView;
