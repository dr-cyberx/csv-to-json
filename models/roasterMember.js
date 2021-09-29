import mongoose, { Schema } from "mongoose";

const roasterMember = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "players",
    unique: true,
  },
  squadNumber: {
    type: String,
  },
  note: {
    type: String,
  },
  position: {
    type: String,
  },
});

const RoasterMember = mongoose.model("roasterMember", roasterMember);
export default RoasterMember;
