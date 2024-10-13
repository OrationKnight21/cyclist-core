import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    totalCost: { type: Number },
    status: {
      type: String,
      enum: ["ongoing", "completed", "canceled"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rental", rentalSchema);
