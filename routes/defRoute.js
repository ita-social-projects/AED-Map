const express = require('express');
const passport = require('passport');

const errorHandler = require('../utils/errorHandler');

const Defibrillator = require('../models/Defibrillator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const defibrillators = await Defibrillator.find().select(
      'address title location'
    );
    return res.status(200).send(defibrillators);
  } catch (e) {
    errorHandler(res, e);
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
      errorHandler(res, e);
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
      errorHandler(res, e);
    }
  }
);

router.delete(
  '/:id',
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
      errorHandler(res, e);
    }
  }
);

module.exports = router;
