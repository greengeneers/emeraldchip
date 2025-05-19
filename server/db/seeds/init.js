/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const User = require('../../models/User.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await Promise.all([
    knex('rsvp').del(),
    knex('events').del(),
    knex('donations').del(),
    knex('users').del(),
  ]);

  // resets tables' id to 1 each time the seed file is executed.
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE donations_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE events_id_seq RESTART WITH 1');

  // Seed Users

  await User.create(
    'johndoe',
    'johndoe@email.com',
    'John Doe',
    'securePass42',
    '10001'
  );

  // Create

  const donationsQuery = `
    INSERT INTO donations
    (donor_id, title, image_url, description, status, weight_lbs, co2_saved_kg)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING *
  `;

  const donationsData = [
    {
      donor_id: 1,
      title: 'Old Smartphone - Samsung Galaxy S8',
      image_url:
        'https://external-preview.redd.it/found-my-old-s8-in-a-drawer-any-idea-what-i-can-do-with-it-v0-krAruytPlJ5eZJE-qUQC3sfrAqr6zpMc1mdQOi4utnw.png?width=640&crop=smart&format=pjpg&auto=webp&s=78f7a79eda1afd17ffa299ef232e3a3e881c542a',
      description:
        'Used Galaxy S8, screen cracked but still powers on. Ideal for parts or recycling.',
      status: 'Recycled',
      weight_lbs: 0.342,
    },
    {
      donor_id: 1,
      title: 'Broken Laptop - HP Pavilion',
      image_url:
        'https://guide-images.cdn.ifixit.com/igi/XtgiKQUFKIfkQ1Si.full',
      description: 'HP Pavilion with damaged motherboard. Hard drive removed.',
      status: 'In Process',
      weight_lbs: 3.86,
    },
    {
      donor_id: 1,
      title: 'CRT Monitor - 17 inch',
      image_url: 'https://i.redd.it/txpcstcupwn91.jpg',
      description:
        'Heavy CRT monitor, works but outdated. Suitable for proper disposal.',
      status: 'Pending',
      weight_lbs: 34.1,
    },
    {
      donor_id: 1,
      title: 'Old Printer - Canon Pixma',
      image_url: 'https://i.ebayimg.com/images/g/cKYAAOSw~mRknzQa/s-l1200.jpg',
      description:
        "Canon Pixma printer, doesn't power on. No ink cartridges included.",
      status: 'Recycled',
      weight_lbs: 19.0,
    },
    {
      donor_id: 1,
      title: 'Box of Misc Electronic Cables',
      image_url:
        'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/KOYAAOSwP5pjZppu/$_32.JPG?set_id=880000500F',
      description: 'Mix of HDMI, USB, power cords, and old charging cables.',
      status: 'Pending',
      weight_lbs: 1.0,
    },
    {
      donor_id: 1,
      title: 'Old iPad 3rd Generation',
      image_url: 'https://i.ebayimg.com/images/g/lo8AAOSwsPJkdUE9/s-l400.jpg',
      description:
        'iPad with cracked screen but functional. Battery holds about 2 hours of charge. 16GB model.',
      status: 'In Process',
      weight_lbs: 1.44,
    },
    {
      donor_id: 1,
      title: 'Dell XPS 13 Laptop (2017)',
      image_url:
        'https://www.cnet.com/a/img/resize/f567a00a6638424a1032d11be77c65cc10840bf6/hub/2017/11/03/2183d4d2-bc00-4711-9b16-5db02c5f477e/03-dell-xps-13-late-2017.jpg?auto=webp&fit=crop&height=360&width=640',
      description:
        'Dell XPS 13 with faulty keyboard. Otherwise in good condition. 8GB RAM, 256GB SSD.',
      status: 'Pending',
      weight_lbs: 2.7,
    },
    {
      donor_id: 1,
      title: 'Old Wireless Router - Netgear N300',
      image_url: 'https://i.ebayimg.com/images/g/x64AAOSw0QpkbBy1/s-l400.jpg',
      description:
        'Working but outdated router. No longer needed after upgrade.',
      status: 'Recycled',
      weight_lbs: 0.75,
    },
    {
      donor_id: 1,
      title: 'PlayStation 3 Console',
      image_url:
        'https://u-mercari-images.mercdn.net/photos/m74402018389_1.jpg',
      description:
        'Original fat model PS3, turns on but disc drive not working. Includes power cable only.',
      status: 'In Process',
      weight_lbs: 11.0,
    },
    {
      donor_id: 1,
      title: 'Nokia 3310 Old Cell Phone',
      image_url:
        'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/Y2UAAOSwspZniQ3V/$_57.PNG?set_id=880000500F',
      description:
        "Classic Nokia phone. Still works but battery doesn't hold charge well.",
      status: 'Recycled',
      weight_lbs: 0.3,
    },
  ];

  const CO2_MULTIPLIER = 0.185; // kg CO₂e per lb (EPA/RecycleSmart)

  for (const donation of donationsData) {
    const co2_saved_kg = +(donation.weight_lbs * CO2_MULTIPLIER).toFixed(2);

    await knex.raw(donationsQuery, [
      donation.donor_id,
      donation.title,
      donation.image_url,
      donation.description,
      donation.status,
      donation.weight_lbs,
      co2_saved_kg,
    ]);
  }

  const events = [
    {
      name: 'Jamaica (Baisley Pond Park)',
      event_url:
        'https://www.lesecologycenter.org/calendar/jamaica-baisley-pond-park/',
      address: 'Baisley Pond Park – 156-10 Baisley Blvd, Rochdale, NY 11434',
      start_date: new Date('2025-06-23T10:00:00-04:00'),
      end_date: new Date('2025-06-23T14:00:00-04:00'),
    },
    {
      name: 'Woodhaven (Forest Park)',
      event_url:
        'https://www.lesecologycenter.org/calendar/woodhaven-forest-park/',
      address: 'Forest Park Bandshell Parking Lot, Woodhaven, NY 11421',
      start_date: new Date('2025-06-01T10:00:00-04:00'),
      end_date: new Date('2025-06-02T14:00:00-04:00'),
    },
  ];

  const eventsQuery = `
    INSERT INTO events
    (name, event_url, address, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *
  `;

  for (const event of events) {
    await knex.raw(eventsQuery, [
      event.name,
      event.event_url,
      event.address,
      event.start_date,
      event.end_date,
    ]);
  }

  const rsvpQuery = `
    INSERT INTO rsvp
    (donor_id, event_id)
    VALUES (?, ?)
    RETURNING *
  `;

  await Promise.all([knex.raw(rsvpQuery, [1, 1]), knex.raw(rsvpQuery, [1, 2])]);
};
