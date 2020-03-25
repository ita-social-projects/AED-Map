const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const {
  resServerError
} = require('../shared/resServerError');
const {
  checkPermission,
  defChangePermission,
  adminPermission
} = require('../middleware/permission');
const {
  ADMIN,
  USER
} = require('../consts/user_role_state');
const Defibrillator = require('../models/Defibrillator');
const router = express.Router();
const {
  deffValidationRules
} = require('./validation/deffRouteValidator');
const { validate } = require('../middleware/validate');
const { getGFS } = require('./../db');

const createFilter = (req) => {
  const { query } = req;
  const filter = {};
  const skipKeys = [
    'page',
    'per_page',
    'longitude',
    'latitude'
  ];

  Object.keys(query).forEach((key) => {
    if (!skipKeys.includes(key)) {
      filter[key] = new RegExp(query[key], 'i');
    }
  });

  const authorized =
    req.role === ADMIN || req.role === USER;
  if (!authorized) {
    filter['blocked'] = { $ne: true };
  }

  return filter;
};

router.get('/', checkPermission, async (req, res) => {
  try {
    const filter = createFilter(req);
    const perPage = Number(req.query.per_page) || 10;
    const page = Number(req.query.page) || 1;
    let listDefs;

    if (req.query.longitude) {
      listDefs =
        (await Defibrillator.find(filter)
          .select('address title location owner blocked')
          .where('location')
          .near({
            center: {
              type: 'Point',
              coordinates: [
                req.query.longitude,
                req.query.latitude
              ]
            }
          })
          .skip(perPage * (page - 1))
          .limit(perPage)) || [];
    } else {
      listDefs =
        (await Defibrillator.find(filter)
          .select('address title location owner blocked')
          .skip(perPage * (page - 1))
          .limit(perPage)) || [];
    }

    const mapDefs = await Defibrillator.find(filter).select(
      'address title location owner'
    );

    const totalCount = Math.ceil(mapDefs.length / perPage);

    return res
      .status(200)
      .send({ listDefs, mapDefs, totalCount });
  } catch (e) {
    resServerError(res, e);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  deffValidationRules(),
  validate,
  async (req, res) => {
    try {
      const defibrillator = await Defibrillator.create({
        ...req.body,
        owner: req.user._id
      });

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
  passport.authenticate('jwt', { session: false }),
  defChangePermission,
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

router.put(
  '/block/:id',
  passport.authenticate('jwt', { session: false }),
  adminPermission,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { blocked } = req.body;
      const defibrillator = await Defibrillator.findByIdAndUpdate(
        id,
        { blocked: blocked },
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
  passport.authenticate('jwt', { session: false }),
  defChangePermission,
  async (req, res) => {
    const gfs = getGFS();
    try {
      const { id } = req.params;
      const defibrillator = await Defibrillator.findByIdAndDelete(
        id
      );

      defibrillator.images.forEach((image) => {
        gfs.delete(
          new mongoose.Types.ObjectId(image.id),
          (err, data) => {
            if (err)
              return res.status(500).json({
                message: 'Не вдалося видалити зображення.'
              });
          }
        );
      });

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
