import { model, Schema, Types } from "mongoose";
import { INotes } from "../interfaces/notes.interface";

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Personal", "Work", "Study", "Othrers"],
      default: "Study",
    },
    pinned: { type: Boolean, default: false },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "gray" },
    },
    user: {type: Schema.Types.ObjectId, ref: "User", required: true}
  },
  { versionKey: false, timestamps: true }
);

export const Note = model("Note", noteSchema);
