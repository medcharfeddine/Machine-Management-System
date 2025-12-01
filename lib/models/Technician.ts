import mongoose from 'mongoose';

const TechnicianSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Technician || mongoose.model('Technician', TechnicianSchema);
