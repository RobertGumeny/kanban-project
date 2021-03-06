import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let commentSchema = new Schema({
  body: { type: String },
  // not sure if needed??
  // commentId: { type: ObjectId },
});

const Task = new Schema(
  {
    comments: [commentSchema],
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    completed: { type: Boolean, default: false },
    listId: { type: ObjectId, ref: "List", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Task.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
Task.pre("deleteMany", function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    //something like...
    //dbContext.Task.deleteMany({ taskId: this._conditions_id }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

//CASCADE ON DELETE
Task.pre("findOneAndRemove", function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    // dbContext.Task.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default Task;
