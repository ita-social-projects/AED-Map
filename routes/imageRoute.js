const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

// GridFS
const { getGFS } = require('./../db');

// Handler for server error 
const { resServerError } = require('../shared/resServerError');

// Model of the collection 'defibrillators'
const Defibrillator = require('../models/Defibrillator');

// Check permissions middleware
const { imageCreatePermission, 
  imageDeletePermission 
} = require('../middleware/permission');

// Create router
const router = express.Router();

// Create GridFs storage for multer middleware
const getStorage = url => {
  const storage = new GridFsStorage({
    url: `mongodb://localhost:27017/${url}`,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }

          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'images'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  return storage;
};

// Route for creating image
router.post('/:defibrillatorId', 
  passport.authenticate('jwt', { session: false }),
  imageCreatePermission,
  (req, res) => {
    const upload = multer({ storage : getStorage(mongoose.connection.name)}).array('images');
    upload(req, res, async err => {
      try {
        const defibrillator = await Defibrillator.findById(req.params.defibrillatorId).select('images');
        const newImages = req.files.map(file => ({ id: file.id, filename: file.filename }));

        await Defibrillator.findByIdAndUpdate(
          req.params.defibrillatorId,
          { images: [...defibrillator.images, ...newImages] },
          { new: true }
        );

        res
          .status(201)
          .json({ images: req.files.map(file => ({ id: file.id, filename: file.filename })) });
    
      } catch (e) {
        resServerError(res, e);
      }
    });
  }
);

// Route for receiving image
router.get(
  '/:imageName',
  async (req, res) => {
    const gfs = getGFS();

    try {
      gfs
        .find({
          filename: req.params.imageName
        })
        .toArray((err, files) => {
          if (!files || files.length === 0) {
            return res.status(404).json({
              message: 'Зображення з даним іменем відсутнє.'
            });
          }
          gfs.openDownloadStreamByName(req.params.imageName).pipe(res);
        });

    } catch (e) {
      resServerError(res, e);
    }
  }
);

// Route for removing image
router.delete(
  '/:defibrillatorId/:imageId',
  passport.authenticate('jwt', { session: false }),
  imageDeletePermission,
  async (req, res) => {
    const gfs = getGFS();

    try {
      const defibrillator = await Defibrillator.findById(req.params.defibrillatorId).select('images');

      await Defibrillator.findByIdAndUpdate(
        req.params.defibrillatorId,
        { images: defibrillator.images.filter(image => image.id !== req.params.imageId) },
        { new: true }
      );

      gfs.delete(new mongoose.Types.ObjectId(req.params.imageId), (err, data) => {
        if (err) return res.status(500).json({ message: 'Не вдалося видалити зображення.' });
        return res.status(200).end();
      });

    } catch (e) {
      resServerError(res, e);
    }
  }
);

module.exports = router;
