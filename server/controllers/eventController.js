const uuid = require('uuid');
const db = require('../models/eventModels');

const findCommonTimeSlots = (eventDetails, userAvailabilities) => {
  const eventTimeStart = parseInt(eventDetails.time_start.split(':')[0], 10);
  const eventTimeEnd = parseInt(eventDetails.time_end.split(':')[0], 10);

  const userSlots = userAvailabilities.map((entry) => [
    parseInt(entry.available_time_start.split(':')[0], 10),
    parseInt(entry.available_time_end.split(':')[0], 10),
  ]);

  // Find the common time slot
  const maxStart = Math.max(
    eventTimeStart,
    ...userSlots.map((slot) => slot[0])
  );
  const minEnd = Math.min(eventTimeEnd, ...userSlots.map((slot) => slot[1]));

  if (maxStart <= minEnd) {
    return [maxStart, minEnd];
  } else {
    return [];
  }
};

const eventController = {};

eventController.addEvent = async (req, res, next) => {
  console.log('eventController.addEvent activated');
  try {
    const {
      organizer_name,
      meeting_name,
      meeting_description,
      location,
      date_start,
      date_end,
      time_start,
      time_end,
      userAvailabilities,
    } = req.body;

    console.log('user availabilities: ', userAvailabilities);

    // Generate a UUID for the link field
    const link = uuid.v4();

    const insertQuery = `
            INSERT INTO events (organizer_name, meeting_name, meeting_description, location, date_start, date_end, time_start, time_end, link)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING event_id, link;
        `;

    const result = await db.query(insertQuery, [
      organizer_name,
      meeting_name,
      meeting_description,
      location,
      date_start,
      date_end,
      time_start,
      time_end,
      link, // Pass the generated link to the query
    ]);

    const {event_id, link: generatedLink} = result.rows[0];

    console.log('Event added successfully. Link:', generatedLink);

    // manually inserted the add user middleware into here. probably better to separate in the future:
    console.log('eventController.addUserAvailability activated');
    console.log('req.body', req.body);

    if (!userAvailabilities || !Array.isArray(userAvailabilities)) {
      return res
        .status(400)
        .json({error: 'Invalid user availabilities format'});
    }

    // took out available_date
    const userInsertQuery = `
        INSERT INTO users (user_name, event_id, available_time_start, available_time_end, back_color, text)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id;
    `;

    for (const availability of userAvailabilities) {
      const startDate = new Date(availability.start);
      const endDate = new Date(availability.end);
      // const availableDate = startDate.toISOString().split('T')[0];
      // const availableTimeStart = startDate.toISOString().split('T')[1];
      // const availableTimeEnd = endDate.toISOString().split('T')[1];
      const availableTimeStart = startDate.toISOString();
      const availableTimeEnd = endDate.toISOString();

      const result = await db.query(userInsertQuery, [
        availability.userName,
        event_id,
        // availableDate,
        availableTimeStart,
        availableTimeEnd,
        availability.backColor,
        availability.text,
      ]);

      const {user_id} = result.rows[0];
      console.log(`User availability added successfully for user ${user_id}`);
    }

    res.status(201).json({event_id, link: generatedLink});
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// eventController.addUserAvailability = async (req, res, next) => {
//   try {
//     const {
//       user_name,
//       event_id,
//       available_date,
//       available_time_start,
//       available_time_end,
//     } = req.body;

//     const insertQuery = `
//             INSERT INTO users (user_name, event_id, available_date, available_time_start, available_time_end)
//             VALUES ($1, $2, $3, $4, $5)
//             RETURNING user_id;
//         `;

//     const result = await db.query(insertQuery, [
//       user_name,
//       event_id,
//       available_date,
//       available_time_start,
//       available_time_end,
//     ]);

//     const { user_id } = result.rows[0];

//     console.log('User availability added successfully');
//     res.status(201).json({ user_id });
//   } catch (error) {
//     console.error('Error adding user availability:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

eventController.addUserAvailability = async (req, res, next) => {
  try {
    console.log('eventController.addUserAvailability activated');
    console.log('req.body', req.body);
    const {userAvailabilities, event_id} = req.body;

    if (!userAvailabilities || !Array.isArray(userAvailabilities)) {
      return res
        .status(400)
        .json({error: 'Invalid user availabilities format'});
    }

    // took out available_date
    const insertQuery = `
        INSERT INTO users (user_name, event_id, available_time_start, available_time_end, back_color, text)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id;
    `;

    for (const availability of userAvailabilities) {
      const startDate = new Date(availability.start);
      const endDate = new Date(availability.end);
      // const availableDate = startDate.toISOString().split('T')[0];
      // const availableTimeStart = startDate.toISOString().split('T')[1];
      // const availableTimeEnd = endDate.toISOString().split('T')[1];
      const availableTimeStart = startDate.toISOString();
      const availableTimeEnd = endDate.toISOString();

      const result = await db.query(insertQuery, [
        availability.userName,
        event_id,
        // availableDate,
        availableTimeStart,
        availableTimeEnd,
        availability.backColor,
        availability.text,
      ]);

      const {user_id} = result.rows[0];
      console.log(`User availability added successfully for user ${user_id}`);
    }

    res
      .status(201)
      .json({message: 'All user availabilities added successfully'});
  } catch (error) {
    console.error('Error adding user availabilities:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

eventController.getAvailabilityPage = async (req, res, next) => {
  try {
    const link = req.params.link;
    const eventQuery = `SELECT * FROM events WHERE link = $1;`;
    const eventResult = await db.query(eventQuery, [link]);
    const eventDetails = eventResult.rows[0];

    // check if event exists
    if (!eventDetails) {
      return res.status(404).json({error: 'Event not found'});
    }

    console.log('event id: ', eventDetails.event_id);

    const userAvailabilityQuery = `
            SELECT user_name, available_time_start, available_time_end, back_color, text
            FROM users
            WHERE event_id = $1;
        `;
    const userAvailabilityResult = await db.query(userAvailabilityQuery, [
      eventDetails.event_id,
    ]);
    const userAvailabilities = userAvailabilityResult.rows;

    console.log('user availabilities: ', userAvailabilities);

    // // Find overlapping time slots
    // const commonTimeSlots = findCommonTimeSlots(
    //   eventDetails,
    //   userAvailabilities
    // );

    // Add the commonTimeSlots to the result
    const result = {
      eventDetails,
      userAvailabilities,
      // commonTimeSlots,
    };

    // res.status(200).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching availability data:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = eventController;
