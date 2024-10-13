import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    isAvailable: { type: Boolean, default: true },
    pricePerHour: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Bike", bikeSchema);
