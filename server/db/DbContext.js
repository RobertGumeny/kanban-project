import mongoose from "mongoose";
import ProfileSchema from "../models/Profile";
import BoardSchema from '../models/Board'
class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Board", BoardSchema)
}

export const dbContext = new DbContext();
