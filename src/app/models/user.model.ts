import { Model, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IAddress, IUser } from "../interfaces/user.interface";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
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
      validate: [validator.isEmail, "Invalid Email address {VALUE}"],
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
    address: { type: addressSchema },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// instance approch
// userSchema.method("hashPassword", async function (plainPassword: string) {
//   const password = await bcrypt.hash(plainPassword, 10);
//   return password;
// });
// export const User = model("User", userSchema);

// static method approch
// userSchema.static("hashPassword", async function (plainPassword: string) {
//   const password = await bcrypt.hash(plainPassword, 10);
//   return password;
// });

// document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.post("save", async function (doc, next) {
  // console.log("%s has been saved", doc._id);
  next();
});

// querry middleware
userSchema.pre("find", async function (next) {
  next();
});
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

userSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`
})

export const User = model<IUser>("User", userSchema);
