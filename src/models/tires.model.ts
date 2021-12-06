import * as mongoose from 'mongoose';

export const photoSchema = new mongoose.Schema({
  imageAddress: {
    type: String,
  },
});

export const tiresSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  price: {
    type: String,
    required: true,
  },
  tireType: {
    type: String,
    required: true,
  },
  tireWidth: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: String,
    required: true,
  },
  wheelDiameter: {
    type: String,
    required: true,
  },
  tireSize: {
    type: String,
    required: true,
  },
  mainPhoto: {
    type: String,
  },
  photos: {
    type: Array,
  },
});

export interface ITireImage extends mongoose.Document {
  imageAddress: string;
}
export interface ITire extends mongoose.Document {
  _id: string;
  tireType: string;
  tireWidth: string;
  price: string;
  aspectRatio: string;
  wheelDiameter: string;
  tireSize: string;
  mainPhoto: string;
  photos: [];
}
