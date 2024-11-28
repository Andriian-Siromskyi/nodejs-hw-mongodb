import { model, Schema } from 'mongoose';
import { typeList } from '../../constans/typeList.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactSchema);
