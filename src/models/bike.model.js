import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    location: {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    isAvailable: { type: Boolean, default: true },
    pricePerHour: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    serverUrl: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Bike", bikeSchema);
