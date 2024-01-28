import React, {useState, useEffect, useMemo, useRef} from 'react';
import {DayPilot, DayPilotCalendar} from '@daypilot/daypilot-lite-react';
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
}) => {
  const [selectedRanges, setSelectedRanges] = useState([]);
  // const [generatedLink, setGeneratedLink] = useState(null);
  const calendarRef = useRef(null); // Create a ref for the calendar

  // Memoize the config object to prevent unnecessary re-renders
  const config = useMemo(() => {
    const localStartDate = startDate
      ? new Date(startDate).toISOString().split('T')[0]
      : null;
    const localEndDate = endDate
      ? new Date(endDate).toISOString().split('T')[0]
      : null;
    const days =
      localStartDate && localEndDate
        ? Math.ceil(
            (new Date(localEndDate) - new Date(localStartDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 7;
    return {
      viewType: 'Days',
      days: days,
      startDate: localStartDate,
      onTimeRangeSelected: (args) => {
        const rangeWithUser = {
          start: args.start.value,
          end: args.end.value,
          id: DayPilot.guid(),
          text: 'Selected',
          backColor: userColor,
          userName: userName,
        };
        setSelectedRanges((prevRanges) => [...prevRanges, rangeWithUser]);
      },
    };
  }, [startDate, endDate, userColor, userName]);

  // Update the calendar events using the ref
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

  // handleClick function to send post request to backend with:
  // meeting name, meeting desc, location, start date, end date, organizer name
  // username, avail date, avail start, avail end
  const handleClick = async () => {
    const postData = {
      organizer_name: organizerName,
      meeting_name: meetingName,
      meeting_description: meetingDescription,
      location: meetingLocation,
      date_start: startDate
      ? new Date(startDate).toISOString().split('T')[0]
      : null,
      date_end: endDate
      ? new Date(endDate).toISOString().split('T')[0]
      : null,
      time_start: '00:00:00',
      time_end: '23:59:59',
      userAvailabilities: selectedRanges
    };
    // "userAvailabilities": selectedRanges

    //   const postData = {
    //     "eventDetails": {
    //       "organizer_name": organizerName,
    //       "meeting_name": meetingName,
    //       "meeting_description": meetingDescription,
    //       "location": meetingLocation,
    //       "date_start": startDate['$d'].toJSON().split('T')[0],
    //       "date_end": endDate['$d'].toJSON().split('T')[0],
    //       "time_start": "00:00:00",
    //       "time_end": "23:59:59"
    //   },
    //     // "userAvailabilities": selectedRanges
    // }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('result: ', result);
        const formattedLink = `http://localhost:5001/availability/${result.link}`;
        setGeneratedLink(formattedLink);
        console.log('Success: Request Complete', result);
        console.log('Link: ', generatedLink); // promise hasn't fulfilled yet
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
