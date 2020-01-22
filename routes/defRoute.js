const express = require('express');
const router = express.Router();

const Defibrillator = require('../models/Defibrillator');

router.get(`/`, async (req, res) => {
  const defibrillators = await Defibrillator.find();
  return res.send(defibrillators);
});

router.post('/create', (req, res) => {
  const {
    title,
    address,
    location,
    actual_date,
    storage_place,
    accessibility,
    language,
    informational_plates,
    phone,
    additional_information,
  } = req.body;

  const newDeff = new Deff({
    title,
    address,
    location,
    actual_date,
    storage_place,
    accessibility,
    language,
    informational_plates,
    phone,
    additional_information,
  });
  
  newDeff.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(201).send({
      error: false,
      newDeff
    });
  });
});

router.put(`/:id`, async (req, res) => {
  const { id } = req.params;
  const defibrillator = await Defibrillator.findByIdAndUpdate(
    id,
    req.body,
  );
  return res.status(202).send({
    error: false,
    defibrillator,
  });
});

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  const defibrillator = await Defibrillator.findByIdAndDelete(
    id,
  );
  return res.status(202).send({
    error: false,
    defibrillator,
  });
});

module.exports = router;
