import mongoose from 'mongoose';

const RepairSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  note: String,
  tech: String
});

const MachineSchema = new mongoose.Schema({
  sn: { type: String, required: true },
  client: { type: String, required: true },
  phone: String,
  type: String,
  brand: String,
  region: String,
  technician: { type: String, required: true },
  entry: { type: Date, default: Date.now },
  exit: Date,
  status: { type: String, default: "In" },
  repairs: [RepairSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Machine || mongoose.model('Machine', MachineSchema);
