/* eslint-disable comma-dangle */
const User = require('../../models/User.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('rsvp').del();
  await knex('events').del();
  await knex('donations').del();
  await knex('users').del();

  // resets tables' id to 1 each time the seed file is executed.
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE donations_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE events_id_seq RESTART WITH 1');

  // Seed Users
  const firstUser = await User.create(
    'james.miller',
    'james.miller@email.com',
    'James Miller',
    'securePass42',
    '10001'
  ); // Manhattan
  const secondUser = await User.create(
    'sophia.lee',
    'sophia.lee@email.com',
    'Sophia Lee',
    'sophiaRocks!',
    '11215'
  ); // Brooklyn
  const thirdUser = await User.create(
    'daniel.williams',
    'daniel.williams@email.com',
    'Daniel Williams',
    'WilliamsPass99',
    '11373'
  ); // Queens
  const fourthUser = await User.create(
    'emily.jones',
    'emily.jones@email.com',
    'Emily Jones',
    'emJ2025!',
    '10458'
  ); // Bronx
  const fifthUser = await User.create(
    'michael.smith',
    'michael.smith@email.com',
    'Michael Smith',
    'mikeSecure88',
    '10314'
  ); // Staten Island

  // Create

  const donationsQuery = `
    INSERT INTO donations
    (donor_id, title, image_url, description, status)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *
  `;

  const donationsData = [
    {
      donor_id: firstUser.id,
      title: 'Old Smartphone - Samsung Galaxy S8',
      image_url: 'https://example.com/images/galaxy-s8.jpg',
      description:
        'Used Galaxy S8, screen cracked but still powers on. Ideal for parts or recycling.',
      status: 'available',
    },
    {
      donor_id: secondUser.id,
      title: 'Broken Laptop - HP Pavilion',
      image_url: 'https://example.com/images/hp-laptop.jpg',
      description: 'HP Pavilion with damaged motherboard. Hard drive removed.',
      status: 'available',
    },
    {
      donor_id: thirdUser.id,
      title: 'CRT Monitor - 17 inch',
      image_url: 'https://example.com/images/crt-monitor.jpg',
      description:
        'Heavy CRT monitor, works but outdated. Suitable for proper disposal.',
      status: 'pending',
    },
    {
      donor_id: fourthUser.id,
      title: 'Old Printer - Canon Pixma',
      image_url: 'https://example.com/images/canon-printer.jpg',
      description:
        'Canon Pixma printer, doesn’t power on. No ink cartridges included.',
      status: 'available',
    },
    {
      donor_id: fifthUser.id,
      title: 'Box of Misc Electronic Cables',
      image_url: 'https://example.com/images/cables.jpg',
      description: 'Mix of HDMI, USB, power cords, and old charging cables.',
      status: 'claimed',
    },
  ];

  await knex.raw(donationsQuery, [
    donationsData[0].donor_id,
    donationsData[0].title,
    donationsData[0].image_url,
    donationsData[0].description,
    donationsData[0].status,
  ]);

  await knex.raw(donationsQuery, [
    donationsData[1].donor_id,
    donationsData[1].title,
    donationsData[1].image_url,
    donationsData[1].description,
    donationsData[1].status,
  ]);

  await knex.raw(donationsQuery, [
    donationsData[2].donor_id,
    donationsData[2].title,
    donationsData[2].image_url,
    donationsData[2].description,
    donationsData[2].status,
  ]);

  await knex.raw(donationsQuery, [
    donationsData[3].donor_id,
    donationsData[3].title,
    donationsData[3].image_url,
    donationsData[3].description,
    donationsData[3].status,
  ]);

  await knex.raw(donationsQuery, [
    donationsData[4].donor_id,
    donationsData[4].title,
    donationsData[4].image_url,
    donationsData[4].description,
    donationsData[4].status,
  ]);

  const eventsQuery = `
    INSERT INTO events
    (name, event_url, address, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *
  `;

  const firstEvent = await knex.raw(eventsQuery, [
    'E-Waste Collection - Jamaica (Baisley Pond Park)',
    'https://www.lesecologycenter.org/calendar/jamaica-baisley-pond-park/',
    'Baisley Pond Park – 156-10 Baisley Blvd, Rochdale, NY 11434',
    new Date('2025-05-03T10:00:00-04:00'),
    new Date('2025-05-03T14:00:00-04:00'),
  ]);

  const secondEvent = await knex.raw(eventsQuery, [
    'E-Waste Collection - Woodhaven (Forest Park)',
    'https://www.lesecologycenter.org/calendar/woodhaven-forest-park/',
    'Forest Park Bandshell Parking Lot, Woodhaven, NY 11421',
    new Date('2025-05-04T10:00:00-04:00'),
    new Date('2025-05-04T14:00:00-04:00'),
  ]);

  const rsvpQuery = `
    INSERT INTO rsvp
    (donor_id, event_id)
    VALUES (?, ?)
    RETURNING *
  `;

  await knex.raw(rsvpQuery, [firstUser.id, firstEvent.rows[0].id]);
  await knex.raw(rsvpQuery, [firstUser.id, secondEvent.rows[0].id]);

  await knex.raw(rsvpQuery, [secondUser.id, firstEvent.rows[0].id]);
  await knex.raw(rsvpQuery, [secondUser.id, secondEvent.rows[0].id]);
};
