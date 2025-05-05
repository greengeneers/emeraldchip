/* eslint-disable comma-dangle */
const knex = require('../db/knex.js');

exports.showOverview = async (req, res) => {
  const user = Number(req.session.userId);

  try {
    const pastEventsCountResult = await knex.raw(
      `
      SELECT COUNT(*) AS past_events_count
      FROM rsvp
      JOIN events ON rsvp.event_id = events.id
      WHERE rsvp.donor_id = ?
        AND events.end_date < NOW()
      `,
      [user]
    );
    const pastEventsCount = pastEventsCountResult.rows[0].past_events_count;

    const donationsCountResult = await knex.raw(
      `
      SELECT COUNT(*) as donations_count
      FROM donations
      WHERE donor_id = ?
      `,
      [user]
    );
    const donationsCount = donationsCountResult.rows[0].donations_count;

    const recentDonationsResult = await knex.raw(
      `
      SELECT *
      FROM donations
      WHERE donor_id = ?
      ORDER BY created_at DESC
      LIMIT 3
      `,
      [user]
    );
    const recentDonations = recentDonationsResult.rows;

    const recentEventsResult = await knex.raw(
      `
      SELECT *
      FROM events
      WHERE end_date > NOW()
      ORDER BY start_date ASC
      LIMIT 2
      `
    );
    const recentEvents = recentEventsResult.rows;

    res.status(200).send({
      pastEventsCount,
      donationsCount,
      recentDonations,
      recentEvents,
    });
  } catch (err) {
    console.error('Error fetching dashboard overview:', err);
    res.status(500).send({ error: 'Failed to load dashboard data' });
  }
};
