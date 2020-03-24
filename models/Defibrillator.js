const mongoose = require('mongoose');

const {
  PRESENT,
  MISSING,
  PRESENT_IN_BUILDING,
  PRESENT_NEAR_APPLIANCE
} = require('../consts/informational_plate_state');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/*
  Model 'Defibrillator'
  10 properties

  title - String
  address - String
  location - Object
    + type - String
    + coordinates - Array[Number]
  actual_date - String
  storage_place - String
  accessibility - String
  language - String
  informational_plates - String 
    + available values: 
      "present",
      "missing", 
      "present in building", 
      "present near appliance"
  phone - Array[String]
  additional_information - String
  images - Array[String]
  owner - ObjectId
  blocked - Boolean

  Note
  There is array coordinates in property 'location.coordinates'.
  First element of this array is 'longitude'(!) and second 'latitude'(!).
  It is a feature of GeoJSON type in MongoDB.
*/

const defibrillatorSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },

    coordinates: {
      type: [Number],
      required: true
    }
  },

  actual_date: {
    type: String,
    required: true
  },

  storage_place: {
    type: String,
    required: true
  },

  accessibility: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },

  informational_plates: {
    type: String,
    enum: [
      PRESENT,
      MISSING,
      PRESENT_IN_BUILDING,
      PRESENT_NEAR_APPLIANCE
    ],
    required: true
  },

  phone: {
    type: [String],
    required: true
  },

  additional_information: {
    type: String,
    required: false
  },

  images: {
    type: [{
      id: String,
      filename: String
    }],
    required: false
  },

  owner: {
    type: ObjectId,
    ref: 'users',
    required: true
  },

  blocked: {
    type: Boolean,
    default: false,
    required: false
  }
});

defibrillatorSchema.index({ location: '2dsphere' });
module.exports = mongoose.model(
  'defibrillators',
  defibrillatorSchema
);
