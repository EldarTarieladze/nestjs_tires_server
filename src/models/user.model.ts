import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myTires: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tires',
    },
  ],
  favorite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tires',
    },
  ],
});

export interface IUser extends mongoose.Document {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
}
