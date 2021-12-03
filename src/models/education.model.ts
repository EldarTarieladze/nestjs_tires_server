import * as mongoose from 'mongoose';

export const educationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

export interface IUserEducation extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
