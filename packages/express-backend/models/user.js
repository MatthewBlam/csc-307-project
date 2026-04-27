import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
  },
  { collection: "users" },
);

export default mongoose.model("User", UserSchema);
