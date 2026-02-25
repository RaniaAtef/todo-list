import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  column: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  order: { type: Number },
}, {

  timestamps: true, 
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  }
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
