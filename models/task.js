import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
