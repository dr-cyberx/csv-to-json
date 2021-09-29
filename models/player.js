import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema({
  ID: {
    type: String,
    unique: true
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  DOB: {
    type: String,
  },
});

const Players = mongoose.model("Players", playerSchema);
export default Players;
