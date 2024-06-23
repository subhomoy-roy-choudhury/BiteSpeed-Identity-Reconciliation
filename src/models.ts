import mongoose, { Schema, Document, model } from "mongoose";

import autoIncrement from "mongoose-auto-increment";

interface IContact extends Document {
  phoneNumber?: string;
  email?: string;
  linkedId?: number;
  linkPrecedence: "secondary" | "primary";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const ContactSchema: Schema<IContact> = new Schema({
  phoneNumber: {
    type: String,
    required: false,
    validate: {
      validator: function (v: string) {
        return /^\+?(\d{1,4}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?[\d-\s]{7,15}$/.test(
          v
        );
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: false,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Basic email regex validation
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  linkedId: { type: Number, required: false },
  linkPrecedence: {
    type: String,
    required: true,
    enum: ["secondary", "primary"],
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  deletedAt: { type: Date, required: false },
});

ContactSchema.index({"email": 1, "phoneNumber": 1}, { unique: true, background: true })

export default model<IContact>("Contact", ContactSchema);
