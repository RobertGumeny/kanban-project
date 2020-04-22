import mongoose from "mongoose";
import ProfileSchema from "../models/Profile";
import BoardSchema from "../models/Board";
import ListSchema from "../models/List";
import TaskSchema from "../models/Task";
import CommentSchema from "../models/Task";
class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Board", BoardSchema);
  Lists = mongoose.model("Lists", ListSchema);
  Tasks = mongoose.model("Tasks", TaskSchema);
  // Comments = mongoose.model("Comments", CommentSchema);
}

export const dbContext = new DbContext();
