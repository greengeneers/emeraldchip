const bcrypt = require('bcrypt');
const knex = require('../db/knex');

const SALT_ROUNDS = 12;

class User {
  #passwordHash = null; // a private property

  // Create a User instance with the password hidden
  // Instances of User can be sent to clients without exposing the password
  constructor({ id, username, email, name, password_hash, zip_code, pfp }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.#passwordHash = password_hash;
    this.zipCode = zip_code;
    this.pfp = pfp;
  }

  // Controllers can use this instance method to validate passwords prior to sending responses
  isValidPassword = (password) => bcrypt.compare(password, this.#passwordHash);

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash.
  static async create(username, email, name, password, zip_code) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `INSERT INTO users (username, email, name, password_hash, zip_code)
      VALUES (?, ?, ?, ?, ?) RETURNING *`;

    const result = await knex.raw(query, [
      username,
      email,
      name,
      passwordHash,
      zip_code,
    ]);

    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Same as above but uses the username to find the user
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  static async exists(email, username) {
    let result;

    if (!username) {
      const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
      result = await knex.raw(query, [email]);
    } else {
      const query = `SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1`;
      result = await knex.raw(query, [email, username]);
    }
    return result.rows.length > 0;
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash.
  static async update(id, username, email, name, zipCode, pfp = '') {
    const query = `
      UPDATE users
      SET username=?, email=?, name=?, zip_code=?, pfp=?
      WHERE id=?
      RETURNING *
    `;

    const result = await knex.raw(query, [
      username,
      email,
      name,
      zipCode,
      pfp,
      id,
    ]);

    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async login(username, password) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    if (!rawUserData) return null;

    const isPasswordValid = await bcrypt.compare(
      password,
      rawUserData.password_hash
    );
    if (!isPasswordValid) return null;

    return new User(rawUserData);
  }

  static async deleteAll() {
    return knex('users').del();
  }
}

module.exports = User;
