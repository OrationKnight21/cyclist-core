import User from "../models/user.model.js";
import Bike from "../models/bike.model.js";
import Rental from "../models/rental.model.js";

const postRentalRecord = async (req, res) => {
  try {
    // TODO: define cost per km across the app
    const email = req.email;
    const bikeId = req.body.bikeId;

    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);

    // Check if the start and end times are valid dates
    if (isNaN(startTime) || isNaN(endTime)) {
      return res.status(400).json({ error: "Invalid startTime  format" });
    }

    const interval = endTime - startTime;
    if (interval < 0) {
      return res
        .status(401)
        .json({ error: "End time is before the start time" });
    }

    // get user from email
    const reqUser = await User.findOne({ email });

    // get bike from bikeID
    const reqBike = await Bike.findById(bikeId);
    if (!reqBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    const hours = interval / (1000 * 60 * 60);
    let totalCost;

    if (hours < 24) {
      totalCost = hours * reqBike.pricePerHour;
    } else {
      const days = Math.ceil(hours / 24);
      totalCost = days * reqBike.pricePerDay;
    }

    // create new rental
    const rental = new Rental({
      user: reqUser,
      bike: reqBike,
      startTime: startTime,
      endTime: endTime,
      totalCost: totalCost,
    });
    await rental.save();

    // return postive message
    return res.status(201).json({ message: "record created" });
  } catch (error) {
    return res.status(500).json({ error: `Failed to create record: ${error}` });
  }
};

const getRentedBike = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    const rented = await Rental.findOne({
      user: user._id,
      status: "ongoing",
    }).populate("bike");

    if (!rented) {
      return res.status(404).json({ error: "No ongoing rental" });
    }

    if (rented.endTime < new Date()) {
      rented.status = "completed";
      await rented.save();
      return res.status(404).json({ error: "Rental has ended" });
    }

    return res.status(200).json(rented);
  } catch (error) {
    console.error("Error fetching rented bike:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { postRentalRecord, getRentedBike };
