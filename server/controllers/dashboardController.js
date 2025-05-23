/* eslint-disable comma-dangle */
const knex = require('../db/knex.js');

exports.showOverview = async (req, res, next) => {
  const user = Number(req.session.userId);

  // TODO: Calculate C20 Saved and Waste Reduced

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

    const wasteAndCO2Result = await knex.raw(
      `
      SELECT 
        COALESCE(SUM(weight_lbs), 0) AS total_weight_lbs,
        COALESCE(SUM(co2_saved_kg), 0) AS total_co2_kg
      FROM donations
      WHERE donor_id = ?
      `,
      [user]
    );

    const { total_weight_lbs: totalWasteReduced, total_co2_kg: totalCO2Saved } =
      wasteAndCO2Result.rows[0];

    const recentEventsResult = await knex.raw(
      `
      SELECT e.*, 
            CASE WHEN r.donor_id IS NOT NULL THEN true ELSE false END AS is_user_registered
      FROM events e
      LEFT JOIN rsvp r 
        ON e.id = r.event_id AND r.donor_id = ?
      WHERE e.end_date > NOW()
      ORDER BY e.start_date ASC
      LIMIT 4
      `,
      [user]
    );
    const recentEvents = recentEventsResult.rows;

    res.status(200).send({
      pastEventsCount,
      donationsCount,
      recentDonations,
      totalWasteReduced,
      totalCO2Saved,
      recentEvents,
    });
  } catch (err) {
    next(err);
  }
};
