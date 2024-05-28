import mongoose, { Document, Schema } from 'mongoose';

export interface Payment extends Document {
  userId: string;
  amount: number;
  date: Date;
}

const paymentSchema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model<Payment>('Payment', paymentSchema);
