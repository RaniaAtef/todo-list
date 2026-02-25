import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  column: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
}, {
  // Don't use MongoDB's default _id for our task id, 
  // we are managing our own 'id' field
  timestamps: true, 
  toJSON: {
    transform: function(doc, ret) {
      // Always return our custom 'id' field, remove Mongo's _id and __v
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  }
});

// Prevent model recompilation in dev hot-reload
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
