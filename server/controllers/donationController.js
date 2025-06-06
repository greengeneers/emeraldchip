const Donation = require('../models/Donation.js');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.getDonations = async (req, res, next) => {
  const { userId } = req.session;
  try {
    const data = await Donation.list(userId);

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.getDonation = async (req, res, next) => {
  const { userId } = req.session;
  const { id: donationId } = req.params;

  try {
    const donation = await Donation.findById(userId, donationId);

    return res.status(200).send(donation);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.createDonation = async (req, res, next) => {
  const { userId } = req.session;
  const { title, imageUrl, description, status, weightLbs } = req.body;

  try {
    const data = await Donation.create(
      userId,
      title,
      imageUrl,
      description,
      status,
      weightLbs
    );

    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.deleteDonation = async (req, res, next) => {
  const { userId } = req.session;
  const { id: donationId } = req.params;

  try {
    const data = await Donation.delete(userId, donationId);

    res.status(204).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.updateDonation = async (req, res, next) => {
  const { userId } = req.session;

  const { id: donationId } = req.params;
  const { title, imageUrl, description, status, weightLbs } = req.body;

  try {
    const data = await Donation.update(
      userId,
      donationId,
      title,
      imageUrl,
      description,
      status,
      weightLbs
    );

    const response = {
      ...data,
      imageUrl: data.image_url,
    };

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
