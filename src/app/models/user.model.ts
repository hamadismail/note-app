import { model, Schema } from "mongoose";
import validator from 'validator';
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
    minlength: 3,
    maxlength: 10,
  },
  lastName: { type: String, required: true, trim: true },
  age: {
    type: Number,
    required: true,
    min: [18, "Age must be at least 18 got {VALUE}"],
    max: 60,
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, "This email is already exists"],
    required: true,
    trim: true,
    // validate: {
    //   validator: function (value) {
    //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    //   },
    //   message: function (props) {
    //     return `Email ${props.value} is not valid email`;
    //   },
    // },
    validate: [validator.isEmail, 'Invalid Email address {VALUE}']

  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "Role is not valid. got {VALUE}",
    },
    default: "user",
  },
});

export const User = model("User", userSchema);
