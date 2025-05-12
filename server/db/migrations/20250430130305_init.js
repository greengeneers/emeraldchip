/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments();
      table.timestamps(true, true);

      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('name').notNullable();
      table.string('password_hash').notNullable();
      table.string('zip_code', 5).notNullable();
    })
    .createTable('donations', (table) => {
      table.increments();
      table.timestamps(true, true);

      table
        .integer('donor_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('title').notNullable();
      table.string('image_url');
      table.string('description');
      table.string('status').notNullable();
      table.float('weight_lbs').notNullable();
      table.float('co2_saved_kg').notNullable();
    })
    .createTable('events', (table) => {
      table.increments();
      table.timestamps(true, true);

      table.string('name').notNullable();
      table.string('event_url');
      table.string('address').notNullable();
      table.timestamp('start_date').notNullable();
      table.timestamp('end_date').notNullable();
    })
    .createTable('rsvp', (table) => {
      table
        .integer('donor_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('event_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE');
      table.primary(['donor_id', 'event_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('rsvp')
    .dropTableIfExists('donations')
    .dropTableIfExists('events')
    .dropTableIfExists('users');
};
