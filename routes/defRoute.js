const express = require('express');
const passport = require('passport');

const resServerError = require('../shared/resServerError');

const Defibrillator = require('../models/Defibrillator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    Object.keys(req.query).forEach((key) => {
      filter[key] = {
        $regex: req.query[key],
        $options: 'i'
      };
    });

    const defibrillators =
      (await Defibrillator.find(filter).select(
        'address title location'
      )) || [];
    return res.status(200).send(defibrillators);
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
