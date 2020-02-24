const express = require('express');
const passport = require('passport');

const { resServerError } = require('../shared/resServerError');

const Defibrillator = require('../models/Defibrillator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    const skipKeys = ['page', 'per_page'];
    Object.keys(req.query).forEach((key) => {
      if (!skipKeys.includes(key)) {
        filter[key] = {
          $regex: req.query[key],
          $options: 'i'
        };
      }
    });
    const perPage = Number(req.query.per_page) || 10;
    const page = Number(req.query.page) || 1;
    const defibrillators =
      (await Defibrillator.find(filter)
        .select('address title location')
        .skip(perPage * (page - 1))
        .limit(perPage)) || [];
    const allDefibrillators = await Defibrillator.find(
      filter
    ).countDocuments();
    const totalCount = Math.ceil(
      allDefibrillators / perPage
    );
    return res
      .status(200)
      .send({ defibrillators, totalCount });
  } catch (e) {
    resServerError(res, e);
  }
});

router.post(
  '/',
  /*passport.authenticate('jwt', { session: false }),*/
  async (req, res) => {
    try {
      const defibrillator = await Defibrillator.create(
        req.body
      );
      return res.status(201).send({
        error: false,
        defibrillator
      });
    } catch (e) {
      resServerError(res, e);
    }
  }
);

router.put(
  '/:id',
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const defibrillator = await Defibrillator.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      return res.status(200).send({
        error: false,
        defibrillator
      });
    } catch (e) {
      resServerError(res, e);
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const defibrillator = await Defibrillator.findById(id);
    return res.status(200).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    resServerError(res, e);
  }
});

router.delete(
  '/:id',
  /*passport.authenticate('jwt', { session: false }),*/ async (
    req,
    res
  ) => {
    try {
      const { id } = req.params;
      const defibrillator = await Defibrillator.findByIdAndDelete(
        id
      );
      return res.status(200).send({
        error: false,
        defibrillator
      });
    } catch (e) {
      resServerError(res, e);
    }
  }
);

module.exports = router;
